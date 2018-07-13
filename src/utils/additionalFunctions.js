import { Modal } from 'antd';
const confirm = Modal.confirm;



/**
 * Парсит данные из токена
 * @param token
 * @returns {*}
 */
export function parseJwt(token) {
    if (typeof token === 'undefined') return null;
    let base64Url = token.split('.')[1];
    if (typeof base64Url === 'undefined') return null;
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    if (typeof base64 === 'undefined') return null;
    return window.atob(base64);
};



export const validation = (string) => {
    const regExpEmail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    return string.match(regExpEmail) !== null
}


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

 const modalConfirmHandler = (status, context, deleteFunc) => {
    status && deleteFunc(context.state.removeItemData);
}

export const deleteSelectedItem = (data, name, context, deleteFunc) => {
  const question =  `Вы уверенны что хотите удалить ${name}`;
  modalConfirm(question, modalConfirmHandler, context, deleteFunc)
  context.setState({
    removeItemData: data
  });
}

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
export const closeEditMode = (context, nameStateProp) => {
  context.setState(prevState => {
      return {
          [nameStateProp]: prevState[nameStateProp].map(el => ({...el, edit: false})),
      }
  })
}
