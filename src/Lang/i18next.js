// import i18next from 'i18next';
// import {getUserSessionLang} from "../selectors/users";

// i18next
//     .init({
//         interpolation: {
//             // React already does escaping
//             escapeValue: false,
//         },
//         fallbackLng: 'en',
//         lng: getUserSessionLang(),
//         // Using simple hardcoded resources for simple example
//         resources: {
//             ru: {
//                 translation: {
//                     layout: {
//                         pageNotFound: 'Страница не найдена'
//                     },
//                     status: {
//                         name: 'Название',
//                         canTransitTo: 'Доступные переходы',
//                         statuses: 'Статусы заказов',
//                         statusHelpHeader: 'Статусы',
//                         statusHelpText: 
//                             [
//                               'Знакомься, это Netpeak Store!',
//                               'Тут ты можешь посмотреть какие товары в наличии, узнать их цену и прочесть подробнее, чем они могут быть тебе полезны, и после этого сделать заказ.',
//                               'Также любой товар можно подарить другому сотруднику Netpeak Group и получить слова благодарности, либо сделать это анонимно и остаться инкогнито :)',
//                               'В Netpeak Store действует только одна валюта — Netpeaks. Их количество указано в твоем профиле в ПУПе и в правом верхнем углу в магазине.',
//                               'От покупки товара до получения заказ находится в нескольких статусах, которые ты можешь отслеживать во вкладке “Мои заказы”:',
//                               '1. Pending review - в этом статусе происходит покупка товара и создается заказ. С твоего счета снимается кол-во Netpeaks по цене товара. После этого ты получаешь письмо на почту с информацией о заказе.',
//                               '2. Confirmed - заказ принят в работу. После перевода в этот статус автоматически ставится задача в ПФ, где ты выступаешь постановщиком, а ответственный админ — исполнителем. В рамках задачи ответственный готовит для тебя заказ. ',
//                               '3. Completed - товар был получен. В этот статус переводится заказ после того, как тебе вручили товар. Затем задачу в ПФ можно завершать. ',
//                               `4. Canceled - заказ был отменен. Перевести заказ в этот статус есть возможность и у тебя, и у админа:`,
//                               `4.1. Ты можешь отменить заказ, если текущий статус Pending review. Такая функция может понадобиться в случае, если ты передумал покупать какой-то товар или случайно выбрал не тот.
//                                     После перевода в статус Canceled тебе возвращаются Netpeaks и приходит письмо на почту с информацией об отмене заказа.`,
//                               `4.2. Админ переводит в Canceled, если произошел какой-то технический сбой или у тебя нет возможности самому отменить заказ. Также заказ отменяется, если сотрудник уволен.
//                                     После перевода в статус Canceled тебе возвращаются Netpeaks и приходит письмо на почту с информацией об отмене заказа.`         
//                         ],
//                     },
//                     office: {
//                         office: 'Офис',
//                         name: 'Название',
//                         responsible: 'Ответственные',
//                     },
//                     form: {
//                         save: 'Сохранить',
//                         cancel: 'Отменить',
//                         back: 'Назад',
//                         actions: 'Действия',
//                         filter: 'Фильтровать',
//                         apply: 'Применить',
//                         saved: 'Сохранено',
//                         successSaved: 'Ваши изменения успешно сохранены',
//                         allFieldsRequired: 'Укажи кому ты хочешь подарить подарок',
//                     },
//                     order: {
//                         id: 'id',
//                         date: 'Дата',
//                         order: 'Заказ',
//                         product: 'Товар',
//                         status: 'Статус',
//                         office: 'Офис получателя',
//                         author: 'Автор',
//                         receiver: 'Получатель',
//                         forPeriod: 'За период',
//                         productName: 'Название товара',
//                         changeStatusForSelected: 'Изменить статус для отмеченных на',
//                         orderId: 'ID заказа',
//                         invalidID: 'Недопустимый ID заказа. ID - целое число',
//                         orderIdHelp: 'Введите id заказа и нажмите ентер',
//                         additionOrderLabel: 'Найти заказ с id',
//                         cancelOrderHeader: 'Отмена заказа',
//                         cancelOrderMessage: 'Ты уверен, что хочешь отменить заказ?',
//                         planfixTask: 'Задача в Планфикс',
//                         failChangeStatus: 'Для следующих заказов не удалось изменить статус:',
//                         task: 'Задача',
//                         companies: 'Товар компании',
//                     },
//                     callApi: {
//                         success: 'Изменения успешно сохранены',
//                     },
//                     product: {
//                         unlimited: 'Бесконечный товар',
//                         gift: 'Можно подарить',
//                         tangible: 'Нематериальный товар',
//                         amount: 'Количество',
//                         not_available: 'нет в наличии',
//                         price: 'Цена',
//                         make_available: 'Сделать доступным',
//                         make_unavailable: 'Сделать недоступным',
//                         title: 'Название в блоке описания товара',
//                         unTangibleRespUsers: 'Ответственные по данному товару',                        
//                         shortTitle: 'Название для главной страницы',
//                         description: 'Описание',
//                         icon: 'Иконка',
//                         obtainText: 'Где и как можно получить',
//                         available: 'Активен',
//                         availableOffices: 'Доступен в офисах',
//                         availableRoles: 'Доступен для ролей',
//                         availableDepts: 'Доступен для департаментов',
//                         companies: 'Товар компании',
//                         addProduct: 'Добавить товар',
//                         availableForAll: 'Для всех',
//                         additionalImages: 'Изображения для слайдера карточки товара',
//                         of: 'из',
//                         unit: 'шт',
//                         left: 'Осталось',
//                         notFound: 'Пусто =(',
//                         previewImages: 'Изображения для слайдера превью'
//                     },
//                     filter: {
//                         filterBy: 'Фильтровать по...',
//                         popular: 'Популярности',
//                         price: 'Цене',
//                         companies: 'Компаниям',
//                         byName: 'По названию',
//                         typeText: 'Введите текст',
//                         byStatus: 'По статусу',
//                         giftPosible: 'Можно подарить',
//                         untangible: 'Нематериальный товар',
//                         all: 'Все',
//                         active: 'Активные',
//                         active_not_available: 'Активные, но не в наличии',
//                         not_active: 'Не активные',
//                         not_available: 'Нет в наличии',
//                         new: 'Новые',
//                         allCompanies: 'Все компании '
//                     },
//                     productsConfirmMessage: {
//                         header: 'Изменение доступности товаров',
//                         message: 'Вы уверены, что хотите изменить доступность товаров?',
//                     },
//                     general: {
//                         no: 'Нет',
//                         yes: 'Да',
//                         logout: 'Выйти',
//                         haveNotAccess: 'У вас недостаточно прав доступа ...',
//                         showAll: 'Показать все',
//                         showMore: 'Показать больше',

//                     },
//                     productsGroupAction: {
//                         enableSelected: 'Включить выделенные',
//                         disableSelected: 'Отключить выделенные'
//                     },
//                     confirmOrderModal: {
//                         header: 'Подтверждение заказа',
//                         content: 'Подтверди свой заказ' ,
//                         netpeaksAmount: 'С твоего счёта будет списано '
//                     },
//                     giftModal: {
//                         header: 'Заказать подарок',
//                         comment: 'Комментарий',
//                         receiver: 'Кому ты хочешь подарить подарок?',
//                     },
//                     myProduct: {
//                         makeGift: 'Подарить',
//                         makeGiftAnonymous: 'Подарить анонимно',
//                         order: 'Заказать',
//                         moreInfo: 'Подробнее',
//                         forYourSelf: 'Купить',
//                         isAnonymous: 'Анонимно',
//                     },
//                     breadcrumbs: {
//                         products: 'Товары',
//                         orders: 'Заказы',
//                         statuses: 'Статусы',
//                         administration: 'Администрирование',
//                         offices: 'Офисы',
//                         myOrders: 'Мои заказы',
//                         editOffice: 'Редактирование офиса',
//                         adminOrders: 'Администрирование: Заказы',
//                         adminProducts: 'Администрирование: Товары',
//                         adminCreateProduct: 'Администрирование: Создать товар',
//                         adminEditProduct: 'Администрирование: Редактирование товара',
//                         adminStatuses: 'Администрирование: Статусы',
//                         adminEditStatuses: 'Администрирование: Редактирование статуса',
//                     },
//                     emptyFilterResult: {
//                         header: 'Пусто! =(',
//                         content: 'Попробуйте изменить параметры фильтра',
//                     },
//                     actions: {
//                         successEdit: 'Изменения успешно сохранены!',
//                         productAdd: 'Товар успешно добавлен!',
//                         orderCreated: 'Ваш заказ успешно создан!',
//                         orderCanceled: 'Ваш заказ успешно отмене!',
//                         unknownError: 'Неизвестная ошибка',
//                     },
//                     footer: {
//                         aboutProject: 'О проекте',
//                         aboutProjectTextPart1: `Приглашаем тебя за покупками в Netpeak Store — магазин, в котором для приобретения чего-то крутого не нужно ждать субботы или зарплаты`,
//                         aboutProjectTextPart2: `. Ведь все товары в нём можно приобрести за нашу внутреннюю валюту — нетпиксы.`
//                     },
//                     productCardPopUp: {
//                         totalInStorage: 'Всего в наличии (шт.)'
//                     }
//                 },
//             },
//             en: {
//                 translation: {
//                     layout: {
//                         pageNotFound: 'Page not found'
//                     },
//                     status: {
//                         name: 'Name',
//                             canTransitTo: 'Available transitions',
//                             statuses: 'Order statuses',
//                             statusHelpHeader: 'Statuses',
//                             statusHelpText:
//                         [
//                             'Welcome to Netpeak Store!',
//                             'This is the place to find products or services, to view their price and description and to order them.',
//                             'Any product may presented to another worker of Netpeak Group. If necessary, a product may be gifted anonymously.',
//                             'Netpeak Store has only one currency — Netpeaks. Quantity of your Netpeaks is available in your profile in PUP and in the top right corner in Store. ',
//                             'There are several statuses your order may get. These statuses are available on “My orders” tab:',
//                             '1. Pending review - this is the first status which is set when you make an order. Quantity of Netpeaks equal to the product/service price is debited from your account. Then you get order details letter to your email.',
//                             '2. Confirmed - the order is being processed. When order status is changed to “Confirmed”, automatic task in PF will be created. You are the task owner, and admin in charge is an executor. Worker in charge prepares your order within this task.',
//                             '3. Completed - the recipient got his product/service. Then the task in PF should be finished.',
//                             `4. Canceled - the order was canceled. Order can be cancelled by both admin and you:`,
//                             `4.1. You may cancel an order if its status is “Pending review”. This option is relevant when you have changed your mind or selected the wrong gift by accident. 
//                                                             When the status is changed to “Canceled”, Netpeaks are returned to your account, and you get a letter about order cancellation.`,
//                             `4.2. Admin cancels your order in case there is the system malfunction or you can’t cancel the order yourself. Order is also canceled if the worker is dismissed. 
//                                                             When the status is changed to “Canceled”, Netpeaks are returned to your account, and you get a letter about order cancellation.`
//                         ],
//                     },
//                     office: {
//                         office: 'Office',
//                             name: 'Name',
//                             responsible: 'Workers in charge',
//                     },
//                     form: {
//                         save: 'Save',
//                             cancel: 'Cancel',
//                             back: 'Back',
//                             actions: 'Actions',
//                             filter: 'Filter',
//                             apply: 'Apply',
//                             saved: 'Saved',
//                             successSaved: 'Your changes have been successfully saved',
//                             allFieldsRequired: 'Specify a worker you want to give a present to',
//                     },
//                     order: {
//                         id: 'id',
//                             date: 'Date',
//                             order: 'Order',
//                             product: 'Product',
//                             status: 'Status',
//                             office: 'Recipient’s office',
//                             author: 'Owner',
//                             receiver: 'Recipient',
//                             forPeriod: 'For a period',
//                             productName: 'Product name',
//                             changeStatusForSelected: 'Change a status of selected items to',
//                             orderId: 'Order ID',
//                             invalidID: 'Invalid order ID. ID is an integer number',
//                             orderIdHelp: 'Type in order id and press “Enter”',
//                             additionOrderLabel: 'Find an order with id',
//                             cancelOrderHeader: 'Order cancellation',
//                             cancelOrderMessage: 'Do you really want to cancel the order?',
//                             planfixTask: 'PlanFix task',
//                             failChangeStatus: 'Failed to change a status for the following orders:',
//                             task: 'Task',
//                             companies: 'Company product',
//                     },
//                     callApi: {
//                         success: 'Changes have been successfully saved',
//                     },
//                     product: {
//                         unlimited: 'Unlimited number of items',
//                             gift: 'Can be gifted',
//                             tangible: 'Service',
//                             amount: 'Quantity',
//                             not_available: 'out of stock',
//                             price: 'Price',
//                             make_available: 'Enable',
//                             make_unavailable: 'Disable',
//                             title: 'Title in product description section',
//                             unTangibleRespUsers: 'Workers in charge of this product',
//                             shortTitle: 'Title for the main page',
//                             description: 'Description',
//                             icon: 'Icon',
//                             obtainText: 'Where and how to receive',
//                             available: 'Available in the products list',
//                             availableOffices: 'Available for the following offices:',
//                             availableRoles: 'Available for the following roles',
//                             availableDepts: 'Available for the following departments',
//                             companies: 'Company product',
//                             addProduct: 'Add a product',
//                             availableForAll: 'Available for everybody',
//                             additionalImages: 'Images for product card slider',
//                             of: 'of',
//                             unit: 'items',
//                             left: 'Left',
//                             notFound: 'Empty =(',
//                             previewImages: 'Images for preview slider'
//                     },
//                     filter: {
//                         filterBy: 'Filter by...',
//                             popular: 'Popularity',
//                             price: 'Price',
//                             companies: 'Companies',
//                             byName: 'Name',
//                             typeText: 'Type in a text',
//                             byStatus: 'Status',
//                             giftPosible: 'Giftable',
//                             untangible: 'Service',
//                             all: 'All',
//                             active: 'Active',
//                             active_not_available: 'Available in the products list but out of stock',
//                             not_active: 'Unavailable in the products list',
//                             not_available: 'Out of stock',
//                             new: 'New',
//                             allCompanies: 'All companies'
//                     },
//                     productsConfirmMessage: {
//                         header: 'Editing products availability',
//                             message: 'Do you really want to edit products availability?',
//                     },
//                     general: {
//                         no: 'No',
//                             yes: 'Yes',
//                             logout: 'Log out',
//                             haveNotAccess: 'No access...',
//                             showAll: 'Show all',
//                             showMore: 'Show more',
//                     },
//                     productsGroupAction: {
//                         enableSelected: 'Enable selected',
//                             disableSelected: 'Disable selected'
//                     },
//                     confirmOrderModal: {
//                         header: 'Order confirmation',
//                             content: 'Confirm your order' ,
//                             netpeaksAmount: 'will be deducted from your account'
//                     },
//                     giftModal: {
//                         header: 'Order a gift',
//                             comment: 'Comment',
//                             receiver: 'Present recipient',
//                     },
//                     myProduct: {
//                         makeGift: 'Gift',
//                             makeGiftAnonymous: 'Gift anonymously',
//                             order: 'Order',
//                             moreInfo: 'Details',
//                             forYourSelf: 'Buy',
//                             isAnonymous: 'Anonymously',
//                     },
//                     breadcrumbs: {
//                         products: 'Products',
//                             orders: 'Orders',
//                             statuses: 'Statuses',
//                             administration: 'Administration',
//                             offices: 'Offices',
//                             myOrders: 'My orders',
//                             editOffice: 'Editing office',
//                             adminOrders: 'Administration: Orders',
//                             adminProducts: 'Administration: Products',
//                             adminCreateProduct: 'Administration: Add a product',
//                             adminEditProduct: 'Administration: Edit a product',
//                             adminStatuses: 'Administration: Statuses',
//                             adminEditStatuses: 'Administration: Edit a status',
//                     },
//                     emptyFilterResult: {
//                         header: 'Empty! =(',
//                             content: 'Try to change filter parameters',
//                     },
//                     actions: {
//                         successEdit: 'Changes have been successfully changed!',
//                             productAdd: 'Product has been successfully added!',
//                             orderCreated: 'Your order has been successfully created!',
//                             orderCanceled: 'Your order has been successfully canceled!',
//                             unknownError: 'Unknown error',
//                     },
//                     footer: {
//                         aboutProject: 'About project',
//                             aboutProjectTextPart1: `We look forward to welcoming you at Netpeak store - the store to buy something cool.`,
//                             aboutProjectTextPart2: `. You don’t have to wait for your salary, all goods can be bought for our internal currency - Netpeaks.`
//                     },
//                     productCardPopUp: {
//                         totalInStorage: 'In stock (items)'
//                     }
//                 },
//             },
//             bg: {
//                 translation: {
//                     layout: {
//                         pageNotFound: 'Страницата не е намерена'
//                     },
//                     status: {
//                         name: 'Название',
//                             canTransitTo: 'Налични статуси',
//                             statuses: 'Статуси на заявките',
//                             statusHelpHeader: 'Статуси',
//                             statusHelpText:
//                         [
//                             'Добре дошъл, това е Netpeak Store!',
//                             'Тук ще може да видиш налични продукти, да разбереш тяхната стойност и да прочетеш подробно, с какво може да са ти от полза и след това да направиш поръчка.',
//                             'Също така всеки продукт може да се подари на друг нетпикър от твое име или инкогнито :)',
//                             'В Netpeak Store се разплаща само с една валута — Netpeaks. Броят ти им е посочен в профила ти в ПУП и в горен десен ъгъл в магазина.',
//                             'От покупката до "доставката" поръчката минава през няколко статуса, които може да проследяваш в таба "Моите поръчки":',
//                             '1. Pending review - при този статус се осъществява заявката на продукта и се създава поръчка. От сметката ти се вземат броят Netpeaks равен на сумата на поръчката. След това получаваш имейл с информацията за поръчката.',
//                             '2. Confirmed - поръчката е приета. Създава се задача в ПФ, където ти си постановчик, а отговорния админ – изпълнител. В рамките на тази задача отговорника подготвя твоята поръчка. ',
//                             '3. Completed - поръчката е получена. Това е статусът след като си получил поръчката. След това задачата в ПФ може да се завършва. ',
//                             `4. Canceled - поръчката е отказана. Този статус може да бъде е иницииран от теб и админа:`,
//                             `4.1. Ти можеш да отмениш поръчката само при статус Pending review. Тази функция ще ти е от полза, ако си променил решението за покупка на конкретен продукт или случайно си избрал друго.
//                                                             След като поръчката е със статус Canceled, иззетите ти Netpeaks се връщат и получаваш имейл с информацията за отказаната поръчка.`,
//                             `4.2. Админът може да сложи статус Canceled в случая на бъг или ако ти нямаш възможност да отмениш поръчката. Също така поръчката се отказва, ако колегата вече не работи в Netpeak.
//                                                             След като поръчката е със статус Canceled, иззетите ти Netpeaks се връщат и получаваш имейл с информацията за отказаната поръчка.`
//                         ],
//                     },
//                     office: {
//                         office: 'Офис',
//                             name: 'Название',
//                             responsible: 'Отговорен',
//                     },
//                     form: {
//                         save: 'Запази',
//                             cancel: 'Откажи',
//                             back: 'Назад',
//                             actions: 'Действия',
//                             filter: 'Филтрирай',
//                             apply: 'Приложи',
//                             saved: 'Запазено',
//                             successSaved: 'Вашите промени са запазени успешно',
//                             allFieldsRequired: 'Посочи, на кого искаш да направиш подарък',
//                     },
//                     order: {
//                         id: 'id',
//                             date: 'Дата',
//                             order: 'Поръчка',
//                             product: 'Продукт',
//                             status: 'Статус',
//                             office: 'Офисът на получателя',
//                             author: 'Автор',
//                             receiver: 'Получател',
//                             forPeriod: 'За период',
//                             productName: 'Името на продукта',
//                             changeStatusForSelected: 'Смени статуса на маркираните с',
//                             orderId: 'ID на поръчката',
//                             invalidID: 'Невалидно ID на поръчката. ID - цяло число',
//                             orderIdHelp: 'Въведи ID на поръчката и натисни Enter',
//                             additionOrderLabel: 'Намери поръчка с ID',
//                             cancelOrderHeader: 'Отказ на поръчката',
//                             cancelOrderMessage: 'Сигурен ли си, че искаш да отмениш поръчката?',
//                             planfixTask: 'Задача в Планфикс',
//                             failChangeStatus: 'Не е успешна смяна на статусите на следните поръчки:',
//                             task: 'Задача',
//                             companies: 'Продукт на компанията',
//                     },
//                     callApi: {
//                         success: 'Промените са запазени успешно',
//                     },
//                     product: {
//                         unlimited: 'Безкраен продукт',
//                             gift: 'Може да се подари',
//                             tangible: 'Нематериален продукт',
//                             amount: 'Количество',
//                             not_available: 'неналично',
//                             price: 'Цена',
//                             make_available: 'Направи достъпен',
//                             make_unavailable: 'Направи недостъпен',
//                             title: 'Заглавие в блока с описанието на продукта',
//                             unTangibleRespUsers: 'Отговорен за даден продукт',
//                             shortTitle: 'Заглавие за главната страница',
//                             description: 'Описание',
//                             icon: 'Иконка',
//                             obtainText: 'Къде и как може да се получи',
//                             available: 'Активен',
//                             availableOffices: 'Достъпен в офисите',
//                             availableRoles: 'Достъпен за ролите',
//                             availableDepts: 'Достъпен за отделите',
//                             companies: 'Продукт на компанията',
//                             addProduct: 'Добави продукт',
//                             availableForAll: 'За всички',
//                             additionalImages: 'Картинка за слайдъра на продуктовата страница',
//                             of: 'от',
//                             unit: 'бр',
//                             left: 'Останаха',
//                             notFound: 'Празно =(',
//                             previewImages: 'Картинка за слайдъра в превюто'
//                     },
//                     filter: {
//                         filterBy: 'Филтрирай по...',
//                             popular: 'Популярност',
//                             price: 'Цена',
//                             companies: 'Компании',
//                             byName: 'По името',
//                             typeText: 'Въведи текст',
//                             byStatus: 'По статус',
//                             giftPosible: 'Може да се подари',
//                             untangible: 'Нематериален продукт',
//                             all: 'Всички',
//                             active: 'Активни',
//                             active_not_available: 'Активни, но неналични',
//                             not_active: 'Неактивни',
//                             not_available: 'Няма в наличност',
//                             new: 'Нови',
//                             allCompanies: 'Всички компании '
//                     },
//                     productsConfirmMessage: {
//                         header: 'Промяна в достъпа да продуктите',
//                             message: 'Сигурен ли си, че искаш да смениш достъпността на продуктите?',
//                     },
//                     general: {
//                         no: 'Не',
//                             yes: 'Да',
//                             logout: 'Излез',
//                             haveNotAccess: 'Недостатъчни права за достъп ...',
//                             showAll: 'Покажи всички',
//                             showMore: 'Показване на още',
//                     },
//                     productsGroupAction: {
//                         enableSelected: 'Активирай маркираните',
//                             disableSelected: 'Деактивирай маркираните'
//                     },
//                     confirmOrderModal: {
//                         header: 'Потвърждение на поръчката',
//                             content: 'Потвърди своята поръчка' ,
//                             netpeaksAmount: 'Портфейла ти с Netpeaks ще отслабне с '
//                     },
//                     giftModal: {
//                         header: 'Направи подарък',
//                             comment: 'Коментар',
//                             receiver: 'На кого искаш да подариш?',
//                     },
//                     myProduct: {
//                         makeGift: 'Направи подарък',
//                             makeGiftAnonymous: 'Направи изненада (анонимно)',
//                             order: 'Поръчай',
//                             moreInfo: 'Подробно',
//                             forYourSelf: 'Купи',
//                             isAnonymous: 'Анонимно',
//                     },
//                     breadcrumbs: {
//                         products: 'Продукти',
//                             orders: 'Поръчки',
//                             statuses: 'Статуси',
//                             administration: 'Администриране',
//                             offices: 'Офиси',
//                             myOrders: 'Моите поръчки',
//                             editOffice: 'Редактиране на офиса',
//                             adminOrders: 'Администриране: Поръчки',
//                             adminProducts: 'Администриране: Продукти',
//                             adminCreateProduct: 'Администриране: Създай продукт',
//                             adminEditProduct: 'Администриране: Редактиране на продукта',
//                             adminStatuses: 'Администриране: Статуси',
//                             adminEditStatuses: 'Администриране: Редактиране на статуса',
//                     },
//                     emptyFilterResult: {
//                         header: 'Празно! =(',
//                             content: 'Пробвай да промениш параметрите на филтъра',
//                     },
//                     actions: {
//                         successEdit: 'Промените са запазени успешно!',
//                             productAdd: 'Продуктът е добавен успешно!',
//                             orderCreated: 'Поръчката е създадена успешно!',
//                             orderCanceled: 'Поръчката ви е отказана успешно!',
//                             unknownError: 'Някакъв странен бъг',
//                     },
//                     footer: {
//                         aboutProject: 'За проекта',
//                             aboutProjectTextPart1: `Каним те да пазаруваш в Netpeak Store — магазинът, в който може да пазаруваш без да чакаш заплатата или да стане събота`,
//                             aboutProjectTextPart2: `. Тъй като всичко може да се купи с вътрешната валута — нетпикс.`
//                     },
//                     productCardPopUp: {
//                         totalInStorage: 'Общо в наличност (бр.)'
//                     }
//                 },
//             },
//         },
//     });

// export default i18next