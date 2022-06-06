export const ARR_LANG = ['ES', 'CA', 'DE', 'EN', 'FR', 'IT', 'JA', 'NL', 'PT', 'RU', 'ZH'];
export const MODEL_DASHBOARD: any = {
    projects: [],
    menu: [],
    dataProject: {},
    alerts: [],
    breadcrumb: [],
    selectedProject: {},
    selectedProjectOrigin: {},
    importData: []
};
export const SHOW: any = {
    data: false,
    menu: false,
    alert: false,
    breadcrumb: false,
    loading: {
        status: true,
        message: 'Cargando datos...'
    },
    error: {
        status: false,
        title: 'Error',
        message: 'Error',
    },
    list: {
        loading:{
            status: false,
            message: 'Cargando datos...'
        }
    },
    dataImport: false
};
export const LITERAL: any = {
    id: 0,
    name: '',
    selectedLit: '',
    isNew: false,
    arrNames: []
};

export const MODEL_MODAL_FORM: any = {
    title: '',
    lang: {
        CA: "",
        DE: "",
        EN: "",
        ES: "",
        FR: "",
        IT: "",
        JA: "",
        NL: "",
        PT: "",
        RU: "",
        ZH: ""
    },
    selected: 0,
    selectedLang: 'ES',
    btnSubmitIsDisabled: true,
    tabsEdit: {
        CA: false,
        DE: false,
        EN: false,
        ES: false,
        FR: false,
        IT: false,
        JA: false,
        NL: false,
        PT: false,
        RU: false,
        ZH: false
    }
};

export const COLOR_TEXT = {
    SUCCESS: 'text-success',
    DANGER: 'text-danger',
    WARNING: 'text-warning',
    PRIMARY: 'text-primary',
    SECONDARY: 'text-secondary',
    DARK: 'text-dark',
    MUTED: 'text-muted',
};

export const ICONS = {
    INFO: '#info-fill',
    WARNING: '#exclamation-triangle-fill',
    DANGER: '#exclamation-triangle-fill',
    SUCCESS: '#check-circle-fill'
};

export const TYPE_LOG = {
    INFO: 'INFO',
    SUCCESS: 'SUCCESS'
};

export const LOG_DATA_FOR_TYPE = {
    INFO: {
        TYPE: TYPE_LOG.INFO,
        ICON: ICONS.INFO,
        CLASS: COLOR_TEXT.MUTED
    },
    SUCCESS: {
        TYPE: TYPE_LOG.SUCCESS,
        ICON: ICONS.SUCCESS,
        CLASS: COLOR_TEXT.SUCCESS
    }
};

export const FILTERS = {
    ALL: 'all',
    MISSING: 'missing',
    UNTRANSLATED: 'untranslated'
};