import React from 'react';
import { useState, useEffect } from 'react';
import Item from '../../Components/Item';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Task() {
  const [arrayConcluded, setArrayConcluded] = useState([]);
  const [arrayPending, setArrayPending] = useState([]);
  const [nameValue, setNameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [descriptionValue, setDescriptionValue] = useState();

  const handlerStatus = (e, index) => {
    return async () => {
      if (e.isConcluded === true && e.checked === true) {
        let passWord;
        if (e.concludingToPending < 2) {
          //por falta de tempo de fazer um componente usei um prompt para ilustrar a ideia
          passWord = prompt('Insira a senha para desbloqueio');
        }
        let res;
        try {
          const body = {
            description: e.description,
            name: e.name,
            isConcluded: false,
            email: e.email,
            password: passWord
          };

          res = await api.patch(`task/${e.id}`, body);
          res.data.checked = false;
          res.data.status = 'Pendente';
        } catch (err) {
          toast.error(err.response.data.error);
          return;
        }

        setArrayConcluded(
          arrayConcluded.filter((_, idx) => {
            if (index !== idx) {
              return true;
            }
            setArrayPending([res.data].concat(arrayPending));
            return false;
          })
        );
      }

      if (e.isConcluded === false && e.checked === false) {
        const body = {
          description: e.description,
          name: e.name,
          isConcluded: true,
          email: e.email,
          password: 'TrabalheNaSaipos'
        };
        let res;
        try {
          res = await api.patch(`task/${e.id}`, body);
          res.data.checked = true;
          res.data.status = 'Concluído';
        } catch (err) {
          toast.error(err.response.data.error);
          return;
        }
        setArrayPending(
          arrayPending.filter((_, idx) => {
            if (index !== idx) {
              return true;
            }
            setArrayConcluded([res.data].concat(arrayConcluded));
            return false;
          })
        );
      }
    };
  };

  const listConcluded = arrayConcluded.map((task, idx) => (
    <Item task={task} idx={idx} handlerStatus={handlerStatus}></Item>
  ));

  const listPending = arrayPending.map((task, idx) => (
    <Item task={task} idx={idx} handlerStatus={handlerStatus}></Item>
  ));
  function clearForm() {
    setDescriptionValue('');
    setNameValue('');
    setEmailValue('');
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: nameValue,
      description: descriptionValue,
      email: emailValue
    };
    try {
      const res = (await api.post('createtask', body)).data;
      res.checked = false;
      res.status = 'Pendente';
      setArrayPending([res].concat(arrayPending));
      clearForm();
    } catch (err) {
      toast.error(err);
    }
  }
  let concluded = [];
  let pending = [];

  const handlerGenerateRandomTasks = async () => {
    try {
      let res = (await api.post('randomTasks')).data;
      res = res.map(element => {
        element.checked = false;
        element.status = 'Pendente';
        return element;
      });
      setArrayPending(res.concat(arrayPending));
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    async function getTasks() {
      try {
        const data = (await api.get('tasks')).data;
        for (let i = 0; i < data.length; i++) {
          let obj = data[i];
          if (obj.isConcluded === true) {
            obj.status = 'Concluído';
            obj.checked = true;
            concluded.push(obj);
          } else {
            obj.status = 'Pendente';
            obj.checked = false;
            pending.push(obj);
          }
        }
        setArrayPending(pending);
        setArrayConcluded(concluded);
      } catch (error) {
        console.log(error);
        toast.error('Ocorreu um erro ao buscar as tarefas');
      }
    }
    getTasks();
  }, []);

  return (
    <div
      style={{
        background: '#ff8',
        padding: '3%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          border: '1px',
          marginRight: '3%'
        }}
      >
        <h1
          style={{
            color: '#000'
          }}
        >
          TAREFAS CONCLUIDAS
        </h1>
        {listConcluded}
      </div>
      <div>
        <h1
          style={{
            color: '#000'
          }}
        >
          TAREFAS PENDENTES
        </h1>
        {listPending}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center'
        }}
      >
        <div
          style={{
            padding: '3%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'space-between',
            margin: '5%'
          }}
        >
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'space-between',
              margin: '5%'
            }}
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Nome"
              type="text"
              name="name"
              value={nameValue}
              onChange={e => setNameValue(e.target.value)}
            />

            <input
              placeholder="E-mail"
              type="text"
              name="email"
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
            />

            <input
              placeholder="Descrição"
              type="text"
              name="Descrição"
              value={descriptionValue}
              onChange={e => setDescriptionValue(e.target.value)}
            />

            <input
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                height: '50px',
                width: '140px',
                backgroundColor: '#f568',
                fontSize: '16px',
                border: '1px',
                borderRadius: '8px',
                marginTop: '5px'
              }}
              type="submit"
              value="Criar nova tarefa"
            />
          </form>
          <button
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              height: '100px',
              width: '120px',
              backgroundColor: '#f568',
              fontSize: '20px',
              borderRadius: '18px',
              marginTop: '32px',
              alignSelf: 'center',
              padding: '7px'
            }}
            onClick={handlerGenerateRandomTasks}
          >
            Estou sem tarefas!
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default Task;
