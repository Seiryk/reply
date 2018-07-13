import { notification } from 'antd';

 const Notification = (type, description) => {
  notification[type]({
    message: type[0].toUpperCase() + type.substring(1),
    description,
    style: {
      width: 600,
      marginLeft: 335 - 600,
    },
  });
};

export default Notification;