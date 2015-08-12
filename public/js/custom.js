define(['libs/date.format', 'common', 'constants'], function (dateformat, common, CONTENT_TYPES) {

    var runApplication = function (success) {
        if (!Backbone.history.fragment) {
            Backbone.history.start({silent: true});
        }
        if (success) {
            var url = (App.requestedURL === null) ? Backbone.history.fragment : App.requestedURL;
            if ((url === "") || (url === "login")) url = 'easyErp';

            Backbone.history.fragment = "";
            Backbone.history.navigate(url, {trigger: true});

        } else {
            if (App.requestedURL === null)
                App.requestedURL = Backbone.history.fragment;
            Backbone.history.fragment = "";
            Backbone.history.navigate("login", {trigger: true});
        }
    };

    var changeContentViewType = function (event, contentType, collection) {

        event.preventDefault();
        if (contentType) {
            this.contentType = contentType;
        }
        var windowLocHash = window.location.hash.split('/')[3];
        var id;
        if (typeof windowLocHash != "undefined" && windowLocHash.length == 24) {
            id = windowLocHash;
        }
        var viewtype = $(event.target).attr('data-view-type'),
            url = "#easyErp/" + this.contentType + "/" + viewtype;

        if (id) {
            if (viewtype != "list" && (viewtype != "thumbnails")) {
                url += "/" + id;
            }
            if (collection) collection.setElement(id);
        } else {

            if (viewtype == "form" && collection) {
                var model = collection.getElement();
                url += "/" + model.attributes._id;
            }
        }

        App.ownContentType = true;

        Backbone.history.navigate(url, {trigger: true});
    };

    var getCurrentVT = function (option) {
        var viewType;
        if (option && (option.contentType != App.contentType)) {
            App.ownContentType = false;
        }
        if (App.currentViewType == null) {
            if (option) {
                switch (option.contentType) {
                    case CONTENT_TYPES.DASHBOARD:
                    case CONTENT_TYPES.TASKS:
                    case CONTENT_TYPES.PROFILES:
                    case CONTENT_TYPES.DEPARTMENTS:
                    case CONTENT_TYPES.USERS:
                    case CONTENT_TYPES.JOBPOSITIONS:
                    case CONTENT_TYPES.DEGREES:
                    case CONTENT_TYPES.SOURCEOFAPPLICANTS:
                    case CONTENT_TYPES.LEADS:
                    case CONTENT_TYPES.BIRTHDAYS:
                    case CONTENT_TYPES.LEADSWORKFLOW:
                    case CONTENT_TYPES.MYPROFILE:
                    case CONTENT_TYPES.QUOTATION:
                    case CONTENT_TYPES.ORDER:
                    case CONTENT_TYPES.INVOICE:
                    case CONTENT_TYPES.SUPPLIERPAYMENTS:
                    case CONTENT_TYPES.CUSTOMERPAYMENTS:
                    case CONTENT_TYPES.SALESQUOTATION:
                    case CONTENT_TYPES.SALESORDER:
                    case CONTENT_TYPES.SALESINVOICE:
                    case CONTENT_TYPES.WTRACK:
                    case CONTENT_TYPES.SALARY:
                    case CONTENT_TYPES.MONTHHOURS:
                    case CONTENT_TYPES.BONUSTYPE:
                    case CONTENT_TYPES.HOLIDAY:
                    case CONTENT_TYPES.VACATION:
                        App.currentViewType = 'list';
                        break;
                    case CONTENT_TYPES.APPLICATIONS:
                    case CONTENT_TYPES.OPPORTUNITIES:
                        App.currentViewType = "kanban";
                        break;
                    default:
                        App.currentViewType = "thumbnails";
                        break;
                }
            } else {
                App.currentViewType = "thumbnails";
            }
            return App.currentViewType;
        } else {
            if (option && !App.ownContentType) {
                switch (option.contentType) {
                    case CONTENT_TYPES.DASHBOARD:
                    case CONTENT_TYPES.TASKS:
                    case CONTENT_TYPES.PROFILES:
                    case CONTENT_TYPES.DEPARTMENTS:
                    case CONTENT_TYPES.USERS:
                    case CONTENT_TYPES.JOBPOSITIONS:
                    case CONTENT_TYPES.DEGREES:
                    case CONTENT_TYPES.SOURCEOFAPPLICANTS:
                    case CONTENT_TYPES.LEADS:
                    case CONTENT_TYPES.BIRTHDAYS:
                    case CONTENT_TYPES.LEADSWORKFLOW:
                    case CONTENT_TYPES.MYPROFILE:
                    case CONTENT_TYPES.QUOTATION:
                    case CONTENT_TYPES.ORDER:
                    case CONTENT_TYPES.INVOICE:
                    case CONTENT_TYPES.SUPPLIERPAYMENTS:
                    case CONTENT_TYPES.CUSTOMERPAYMENTS:
                    case CONTENT_TYPES.SALESQUOTATION:
                    case CONTENT_TYPES.SALESORDER:
                    case CONTENT_TYPES.SALESINVOICE:
                    case CONTENT_TYPES.WTRACK:
                    case CONTENT_TYPES.SALARY:
                    case CONTENT_TYPES.MONTHHOURS:
                    case CONTENT_TYPES.BONUSTYPE:
                    case CONTENT_TYPES.HOLIDAY:
                    case CONTENT_TYPES.VACATION:
                        App.currentViewType = 'list';
                        break;
                    case CONTENT_TYPES.APPLICATIONS:
                    case CONTENT_TYPES.OPPORTUNITIES:
                        App.currentViewType = "kanban";
                        break;
                    default:
                        App.currentViewType = "thumbnails";
                        break;
                }
            }
        }

        var viewVariants = ["kanban", "list", "form", "thumbnails"];
        if ($.inArray(App.currentViewType, viewVariants) === -1) {
            App.currentViewType = "thumbnails";
            viewType = "thumbnails";
        } else {
            viewType = App.currentViewType;
        }
        return viewType;
    };

    var setCurrentVT = function (viewType) {
        var viewVariants = ["kanban", "list", "form", "thumbnails"];

        if (viewVariants.indexOf(viewType) != -1) {
            App.currentViewType = viewType;
        } else {
            viewType = "thumbnails";
            App.currentViewType = viewType;
        }

        return viewType;
    };

    var getCurrentCL = function () {
        if (App.currentContentLength == null) {
            App.currentContentLength = 0;
            return App.currentContentLength;
        }

        var testLength = new RegExp(/^[0-9]{1}[0-9]*$/), contentLength;
        if (testLength.test(App.currentContentLength) == false) {
            App.currentContentLength = 0;
            contentLength = 0;
        } else {
            contentLength = App.currentContentLength;
        }
        return contentLength;
    };

    var setCurrentCL = function (length) {
        var testLength = new RegExp(/^[0-9]{1}[0-9]*$/);

        if (testLength.test(length) == false)
            length = 0;
        App.currentContentLength = length;

        return length;
    };


    function applyDefaultSettings(chartControl) {
        chartControl.setImagePath("/crm_backbone_repo/images/");
        chartControl.setEditable(false);
        chartControl.showTreePanel(false);
        chartControl.showContextMenu(false);
        chartControl.showDescTask(true, 'd,s-f');
        chartControl.showDescProject(true, 'n,d');
    };

    function cashToApp(key, data) {
        App.cashedData = App.cashedData || {};
        App.cashedData[key] = data;
    }

    function retriveFromCash(key) {
        App.cashedData = App.cashedData || {};
        return App.cashedData[key];
    }

    var savedFilters = function (contentType, filter) {
        var savedFilter;
        var length;
        var filtersForContent;
        var lastFilterName;
        var filterName;

        if (App.currentUser && App.currentUser.savedFilters) {
            length = App.currentUser.savedFilters.length;
            filtersForContent = getFiltersForContentType(contentType);
            for (var i = length - 1; i >= 0; i--){
                lastFilterName = filtersForContent[filtersForContent.length - 1];
                filterName = Object.keys(lastFilterName['value']);
                savedFilter = lastFilterName['value'][filterName];
           }

        } else {
            savedFilter = filter;
        }

        return savedFilter;
    };

    var getFilterById = function (savedFilters, id) {
        var filter;
        var length = savedFilters.length;
        var keys;

        for (var i = length - 1; i >= 0; i--){
            if (savedFilters[i]['_id'] === id){
                keys = Object.keys(savedFilters[i]['value']);
                filter = savedFilters[i]['value'][keys[0]];
            }
        }

        return filter;
    };

    var getFiltersForContentType = function (contentType) {
        var length = App.currentUser.savedFilters.length;
        var filtersForContent = [];
        var filterObj = {};
        var savedFiltersArray = App.currentUser.savedFilters;

        for (var i = length - 1; i >= 0; i--) {
            if (savedFiltersArray[i]['contentView'] === contentType) {
                filterObj = {};
                filterObj._id = savedFiltersArray[i]['_id'];
                filterObj.value = savedFiltersArray[i]['filter'][0];
                filtersForContent.push(filterObj);
            }
        }

        App.savedFilters[contentType] = filtersForContent;
        return filtersForContent;
    };

    var getFiltersValues = function (chosen, defaultFilterStatus, logicAndStatus) {
        var filterKey;
        var checkedValues;
        var filter = {};

        filter['condition'] = logicAndStatus ? 'and' : 'or';

        if (chosen.length) {
            chosen.each(function (index, elem) {
                filterKey = $(elem).find('.chooseTerm').val();
                checkedValues = $(elem).find('input:checked');

                if (checkedValues.length) {
                    if (!filter[filterKey]) {
                        filter[filterKey] = [];
                    }

                    checkedValues.each(function (index, element) {
                        filter[filterKey].push($(element).val());
                    });
                }
            });
        };

        if (defaultFilterStatus || (Object.keys(filter).length === 1)) {
            filter = 'empty';
        };

        return filter;
    };

    return {
        runApplication: runApplication,
        changeContentViewType: changeContentViewType,
        //getCurrentII: getCurrentII,
        //setCurrentII: setCurrentII,
        getCurrentVT: getCurrentVT,
        setCurrentVT: setCurrentVT,
        getCurrentCL: getCurrentCL,
        setCurrentCL: setCurrentCL,
        cashToApp: cashToApp,
        retriveFromCash: retriveFromCash,
        savedFilters: savedFilters,
        getFiltersValues: getFiltersValues,
        getFiltersForContentType: getFiltersForContentType,
        getFilterById: getFilterById
    };
});
