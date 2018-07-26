import { Modal } from 'antd';
import axios from 'axios';
import JWTDecode from 'jwt-decode';

const confirm = Modal.confirm;



/**
 * Парсит данные из токена
 * @param token
 * @returns {*}
 */
export function parseJwt(token) {
    return JSON.stringify(JWTDecode(token));
};


// валидация на email
export const validation = (string) => {
    const regExpEmail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    return string.match(regExpEmail) !== null
}

// модалка для удаления
export const  modalConfirm = (title, modalConfirmHandler, context, deleteFunc) => {
    confirm({
      title,
      onOk() {
        modalConfirmHandler(true, context, deleteFunc);
      },
      onCancel() {
        modalConfirmHandler(false, context);
      },
    });
  }

// дополнительная функция для удаления(вызывет экшн для удаления)
 const modalConfirmHandler = (status, context, deleteFunc) => {
    status && deleteFunc(context.state.removeItemData);
}
// всплывающее окно для удаления 
export const deleteSelectedItem = (data, name, context, deleteFunc) => {
  const question =  `Вы уверенны что хотите удалить ${name}`;
  modalConfirm(question, modalConfirmHandler, context, deleteFunc)
  context.setState({
    removeItemData: data
  });
}


// включает режим редактированя (вынесена сдесь так как используется в нескольких компонентах)
// id id id элемента
// context это контекст компонента 
// statePropName имя свойства из стэйта (массив) который мы перебираем что бы определить какой элемент редоктируем
// prop1 и prop2 свойства объекта которые записываем в стэйт что бы сохранить текущее значение 
export const makeFieldEditable = (id, context, statePropName, prop1, prop2 ) => {
    let val1;
    let val2;
    context.setState(prevState => {
        return {
            [statePropName]: prevState[statePropName].map(el => {
                if (el.id === id) {
                    val1 = el[prop1].value || el[prop1];
                    val2 = el[prop2].value || el[prop2];
                    return {...el, edit: true}
                }
                else return {...el, edit: false}
            }),
            [prop1]: val1,
            [prop2]: val2
        }
    })
}

// закрываем режим редактирования
export const closeEditMode = (context, nameStateProp) => {
  context.setState(prevState => {
      return {
          [nameStateProp]: prevState[nameStateProp].map(el => ({...el, edit: false})),
      }
  })
}
// добавляем токин в хедер
export const addBaseAxiosSettings = () => {
    axios.defaults.headers.common['Authorisation'] = `Bearer ${window.localStorage.getItem('token')}`
}

//добавляем id внутреннего аккаунта с рассылками в хедер
export const addAccountIdToHeders = (id) => {
    axios.defaults.headers.common['X-Reply-Account-Id'] = id
}
