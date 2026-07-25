const en = {
    header: {
        addSetup: "Add setup",
        selectLanguage: "Select language",
        enableLightTheme: "Enable light theme",
        enableDarkTheme: "Enable dark theme",
    },

    createSetup: {
        title: "Create setup",
        description:
            "Add a trading pair, direction, and setup price levels.",
        close: "Close setup creation window",

        symbolLabel: "Trading pair",
        symbolPlaceholder: "Select a trading pair",
        symbolNoOptions: "Trading pair not found",
        symbolLoading: "Loading trading pairs...",
        symbolRequired: "Trading pair is required",
        symbolsLoadError:
            "Failed to load trading pairs",

        directionLabel: "Direction",

        statusLabel: "Status",
        activeSetup: "Active setup",

        entriesTitle: "Entry levels",
        entriesDescription:
            "Add between one and ten entry levels.",
        entryLabel: "Entry",
        addEntry: "Add",
        clearEntry: "Clear entry price",
        deleteEntry: "Delete entry level",

        takeProfitsTitle: "Take Profit",
        takeProfitsDescription:
            "Add target profit-taking levels.",
        takeProfitLabel: "TP",
        addTakeProfit: "Add",
        clearTakeProfit: "Clear Take Profit",
        deleteTakeProfit: "Delete Take Profit",

        stopLossLabel: "Stop Loss",
        clearStopLoss: "Clear Stop Loss",

        noteLabel: "Note",
        notePlaceholder:
            "Add a description or comment for the setup",

        cancel: "Cancel",
        submit: "Create setup",
        submitting: "Creating...",

        priceRequired: "Price is required",
        priceInvalid:
            "Enter a valid price with no more than 9 decimal places",
        pricePositive:
            "Price must be greater than zero",
        noteMaxLength:
            "The note cannot contain more than 1000 characters",

        createError: "Failed to create setup",
        connectionError:
            "Failed to connect to the server",
    },

    common: {
        locale: "en-US",
    },

    setups: {
        active: "Active",
        inactive: "Inactive",

        makeActive:
            "Make setup active",
        makeInactive:
            "Make setup inactive",

        currentPrice: "Current price",
        entries: "Entries",
        takeProfits: "Take Profit",
        stopLoss: "Stop Loss",
        note: "Note",
        withoutNote: "No note",

        currency: "USDT",

        edit: "Edit setup",
        editUnavailable:
            "Editing will be added later",
        delete: "Delete setup",

        statusUpdateError:
            "Failed to update setup status",

        emptyTitle: "No setups yet",
        emptyDescription:
            "Create your first trading setup using the button at the top of the page.",
    },

    deleteSetup: {
        title: "Delete setup",
        description:
            "Are you sure you want to delete the setup",
        warning:
            "This action cannot be undone. The setup will be permanently removed from the database.",
        close: "Close delete window",
        cancel: "Cancel",
        delete: "Delete",
        deleting: "Deleting...",
        deleteError:
            "Failed to delete the setup",
        connectionError:
            "Failed to connect to the server",
    },
};

export default en;