const uk = {
    header: {
        addSetup: "Додати сетап",
        selectLanguage: "Вибрати мову",
        enableLightTheme: "Увімкнути світлу тему",
        enableDarkTheme: "Увімкнути темну тему",
    },

    createSetup: {
        title: "Створити сетап",
        description:
            "Додайте торгову пару, напрямок і цінові рівні сетапу.",
        close: "Закрити вікно створення сетапу",

        symbolLabel: "Торгова пара",
        symbolPlaceholder: "Оберіть торгову пару",
        symbolNoOptions: "Торгову пару не знайдено",
        symbolLoading: "Завантаження торгових пар...",
        symbolRequired: "Торгова пара є обов'язковою",
        symbolsLoadError:
            "Не вдалося завантажити торгові пари",

        directionLabel: "Напрямок",

        statusLabel: "Статус",
        activeSetup: "Активний сетап",

        entriesTitle: "Рівні входу",
        entriesDescription:
            "Додайте від одного до десяти рівнів.",
        entryLabel: "Entry",
        addEntry: "Додати",
        clearEntry: "Очистити ціну входу",
        deleteEntry: "Видалити рівень входу",

        takeProfitsTitle: "Take Profit",
        takeProfitsDescription:
            "Додайте цільові рівні фіксації прибутку.",
        takeProfitLabel: "TP",
        addTakeProfit: "Додати",
        clearTakeProfit: "Очистити Take Profit",
        deleteTakeProfit: "Видалити Take Profit",

        stopLossLabel: "Stop Loss",
        clearStopLoss: "Очистити Stop Loss",

        noteLabel: "Нотатка",
        notePlaceholder:
            "Додайте опис або коментар до сетапу",

        cancel: "Скасувати",
        submit: "Створити сетап",
        submitting: "Створення...",

        priceRequired: "Ціна є обов'язковою",
        priceInvalid:
            "Введіть коректну ціну з максимальною точністю 9 знаків після крапки",
        pricePositive:
            "Ціна повинна бути більшою за нуль",
        noteMaxLength:
            "Нотатка не може містити більше 1000 символів",

        createError: "Не вдалося створити сетап",
        connectionError:
            "Не вдалося з'єднатися із сервером",
    },

    common: {
        locale: "uk-UA",
    },

    setups: {
        active: "Активний",
        inactive: "Неактивний",

        makeActive:
            "Зробити сетап активним",
        makeInactive:
            "Зробити сетап неактивним",

        currentPrice: "Поточна ціна",
        entries: "Входи",
        takeProfits: "Take Profit",
        stopLoss: "Stop Loss",
        note: "Нотатка",
        withoutNote: "Без нотатки",

        currency: "USDT",

        edit: "Редагувати сетап",
        editUnavailable:
            "Редагування буде додано пізніше",
        delete: "Видалити сетап",

        statusUpdateError:
            "Не вдалося змінити статус сетапу",

        emptyTitle:
            "Сетапів поки немає",
        emptyDescription:
            "Створіть перший торговий сетап за допомогою кнопки у верхній частині сторінки.",
    },

    deleteSetup: {
        title: "Видалити сетап",
        description:
            "Ви дійсно хочете видалити сетап",
        warning:
            "Цю дію неможливо скасувати. Сетап буде остаточно видалено з бази даних.",
        close: "Закрити вікно видалення",
        cancel: "Скасувати",
        delete: "Видалити",
        deleting: "Видалення...",
        deleteError:
            "Не вдалося видалити сетап",
        connectionError:
            "Не вдалося з'єднатися із сервером",
    },
};

export default uk;