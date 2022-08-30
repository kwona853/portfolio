klevu.coreEvent.build({name:"setRemoteConfigQuick",fire:function(){return!(!klevu.getSetting(klevu.settings,"settings.localSettings",!1)||klevu.isUndefined(klevu.search.extraSearchBox)||0==klevu.search.extraSearchBox.length)},maxCount:500,delay:30}),klevu.coreEvent.attach("setRemoteConfigQuick",{name:"search-quick-templates",fire:function(){klevu.each(klevu.search.extraSearchBox,function(key,box){box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickTemplateBase"),"klevuTemplateBase",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickAutoSuggestions"),"klevuQuickAutoSuggestions",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickPageSuggestions"),"klevuQuickPageSuggestions",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickCategorySuggestions"),"klevuQuickCategorySuggestions",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickProducts"),"klevuQuickProducts",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickProductBlock"),"klevuQuickProductBlock",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickNoResultFound"),"klevuQuickNoResultFound",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickNoResultCategory"),"klevuQuickNoResultCategory",!0),box.getScope().template.setTemplate(klevu.dom.helpers.getHTML("#klevuQuickNoResultCms"),"klevuQuickNoResultCms",!0)})}}),klevu.coreEvent.attach("setRemoteConfigQuick",{name:"search-quick-locale",fire:function(){var translatorQuick=klevu.search.quick.getScope().template.getTranslator();translatorQuick.addTranslation("Search","Search"),translatorQuick.addTranslation("<b>%s</b> productList","<b>%s</b> Products"),translatorQuick.addTranslation("<b>%s</b> contentList","<b>%s</b> Other results"),translatorQuick.mergeToGlobal();var currencyQuick=klevu.search.quick.getScope().currency;currencyQuick.setCurrencys({GBP:{string:"£ ",format:"%s%s",atEnd:!1,precision:0,thousands:",",decimal:".",grouping:3},USD:{string:"$ ",atEnd:!1,precision:0},EUR:{string:" €",format:"%s %s",atEnd:!0,precision:0},JPY:{string:"¥",format:"%s%s",precision:0},HKD:{string:"HKD ",format:"%s %s",atEnd:!1,precision:0}}),currencyQuick.mergeToGlobal()}}),klevu.coreEvent.attach("setRemoteConfigQuick",{name:"search-quick-chains",fire:function(){klevu.each(klevu.search.extraSearchBox,function(key,box){box.getScope().template.getTranslator().mergeFromGlobal(),box.getScope().template.getTranslator().getCurrencyObject().mergeFromGlobal(),box.getScope().chains.events.focus.add({name:"displayOverlay",fire:function(data,scope){klevu.getSetting(scope.kScope.settings,"settings.search.searchBoxTarget").style="display: block !important;",document.getElementsByTagName("body")[0].dataset.klevu="open",jQuery(".input-text").keyup(function(){jQuery(this).val()?jQuery(".action.search").removeClass("disabled"):jQuery(".action.search").addClass("disabled")})}}),box.getScope().chains.events.focus.add({name:"doSearch",fire:function(data,scope){var chain=klevu.getObjectPath(scope.kScope,"chains.actions.doSearch");if(klevu.isUndefined(chain)||0===chain.list().length||(chain.setScope(scope.kElem),chain.setData(data),chain.fire()),scope.kScope.data=data,!0===data.context.preventDefault)return!1}}),box.getScope().chains.request.build.add({name:"addAutosugestions",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),suggestion=klevu.extend(!0,{},parameterMap.suggestions);suggestion.id="autosuggestion",suggestion.query=data.context.term,suggestion.typeOfRequest="AUTO_SUGGESTIONS",suggestion.limit=3,data.request.current.suggestions.push(suggestion),data.context.doSearch=!0}}),box.getScope().chains.request.build.add({name:"addCategoryCompressed",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),categoryCompressed=klevu.extend(!0,{},parameterMap.recordQuery);categoryCompressed.id="categoryCompressed",categoryCompressed.typeOfRequest="SEARCH",categoryCompressed.settings.query.term=data.context.term,categoryCompressed.settings.typeOfRecords=["KLEVU_CATEGORY"],categoryCompressed.settings.searchPrefs=["searchCompoundsAsAndQuery"],categoryCompressed.settings.fields=["id","name","shortDesc","url","typeOfRecord"],categoryCompressed.settings.limit=3,categoryCompressed.settings.sort="RELEVANCE",categoryCompressed.settings.fallbackQueryId="categoryCompressedFallback",data.request.current.recordQueries.push(categoryCompressed),data.context.doSearch=!0}}),box.getScope().chains.request.build.add({name:"addCategoryCompressedFallback",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),categoryCompressedFallback=klevu.extend(!0,{},parameterMap.recordQuery);categoryCompressedFallback.id="categoryCompressedFallback",categoryCompressedFallback.typeOfRequest="SEARCH",categoryCompressedFallback.settings.typeOfRecords=["KLEVU_CATEGORY"],categoryCompressedFallback.settings.searchPrefs=["searchCompoundsAsAndQuery"],categoryCompressedFallback.settings.fields=["id","name","shortDesc","url","typeOfRecord"],categoryCompressedFallback.settings.limit=3,categoryCompressedFallback.settings.sort="RELEVANCE",categoryCompressedFallback.isFallbackQuery="true",categoryCompressedFallback.settings.query.term="*",data.request.current.recordQueries.push(categoryCompressedFallback),data.context.doSearch=!0}}),box.getScope().chains.request.build.add({name:"addCmsCompressed",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),cmsCompressed=klevu.extend(!0,{},parameterMap.recordQuery);cmsCompressed.id="cmsCompressed",cmsCompressed.typeOfRequest="SEARCH",cmsCompressed.settings.query.term=data.context.term,cmsCompressed.settings.typeOfRecords=["KLEVU_CMS"],cmsCompressed.settings.searchPrefs=["searchCompoundsAsAndQuery"],cmsCompressed.settings.fields=["id","name","shortDesc","url","typeOfRecord"],cmsCompressed.settings.limit=3,cmsCompressed.settings.sort="RELEVANCE",cmsCompressed.settings.fallbackQueryId="cmsCompressedFallback",data.request.current.recordQueries.push(cmsCompressed),data.context.doSearch=!0}}),box.getScope().chains.request.build.add({name:"addCmsCompressedFallback",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),cmsCompressedFallback=klevu.extend(!0,{},parameterMap.recordQuery);cmsCompressedFallback.id="cmsCompressedFallback",cmsCompressedFallback.typeOfRequest="SEARCH",cmsCompressedFallback.settings.query.term=data.context.term,cmsCompressedFallback.settings.typeOfRecords=["KLEVU_CMS"],cmsCompressedFallback.settings.searchPrefs=["searchCompoundsAsAndQuery"],cmsCompressedFallback.settings.fields=["id","name","shortDesc","url","typeOfRecord"],cmsCompressedFallback.settings.limit=3,cmsCompressedFallback.settings.sort="RELEVANCE",cmsCompressedFallback.isFallbackQuery="true",cmsCompressedFallback.settings.query.term="*",data.request.current.recordQueries.push(cmsCompressedFallback),data.context.doSearch=!0}}),box.getScope().chains.request.build.add({name:"addProductList",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),productList=klevu.extend(!0,{},parameterMap.recordQuery);productList.id="productList",productList.typeOfRequest="SEARCH",productList.settings.query.term=data.context.term,productList.settings.typeOfRecords=["KLEVU_PRODUCT"],productList.settings.fallbackQueryId="productListFallback",productList.settings.limit=8,productList.settings.searchPrefs=["searchCompoundsAsAndQuery"],productList.settings.sort="RELEVANCE",data.request.current.recordQueries.push(productList),data.context.doSearch=!0}}),box.getScope().chains.request.build.add({name:"addProductListFallback",fire:function(data,scope){var parameterMap=klevu.getSetting(scope.kScope.settings,"settings.search.map",!1),productListFallback=klevu.extend(!0,{},parameterMap.recordQuery);productListFallback.id="productListFallback",productListFallback.typeOfRequest="SEARCH",productListFallback.isFallbackQuery="true",productListFallback.settings.query.term="*",productListFallback.settings.typeOfRecords=["KLEVU_PRODUCT"],productListFallback.settings.searchPrefs=["excludeDescription","searchCompoundsAsAndQuery"],productListFallback.settings.limit=8,productListFallback.settings.sort="RELEVANCE",data.request.current.recordQueries.push(productListFallback),data.context.doSearch=!0}}),box.getScope().chains.template.render.add({name:"renderResponse",fire:function(data,scope){if(data.context.isSuccess){if(""===data.template.settings.term){if(void 0!==window.klevuDefaultCategories){let fallbackCategoriesData=JSON.parse(window.klevuDefaultCategories);Array.isArray(fallbackCategoriesData)&&fallbackCategoriesData.length>0&&void 0!==data.template.query.categoryCompressed&&(data.template.query.categoryCompressed.result=fallbackCategoriesData)}if(void 0!==window.klevuDefaultCmsPages){let fallbackCmsPagesData=JSON.parse(window.klevuDefaultCmsPages);Array.isArray(fallbackCmsPagesData)&&fallbackCmsPagesData.length>0&&void 0!==data.template.query.cmsCompressed&&(data.template.query.cmsCompressed.result=fallbackCmsPagesData)}}scope.kScope.template.setData(data.template);var element=scope.kScope.template.convertTemplate(scope.kScope.template.render("klevuTemplateBase")),target=klevu.getSetting(scope.kScope.settings,"settings.search.searchBoxTarget"),overlay=document.getElementById("klevuOverlay");target.innerHTML="",target.classList.add("klevuTarget"),scope.kScope.element.kData=data.template,scope.kScope.template.insertTemplate(target,element),overlay.style="display: block;"}}}),box.getScope().chains.template.render.add({name:"positionTemplate",fire:function(data,scope){var target=klevu.getSetting(scope.kScope.settings,"settings.search.searchBoxTarget"),positions=scope.kScope.element.getBoundingClientRect();klevu.dom.find(".klevuWrap",target)[0].style="top:"+positions.bottom+"px;left: "+(positions.right-500>0?positions.right-500:0)+"px;right: auto;"}});var klevuSettings=JSON.parse(window.klevuSettings);box.getScope().element.kElem.form.action=klevuSettings.baseUrl.slice(0,-1)+klevu.getSetting(box.getScope().settings,"settings.url.landing",!1)})}}),function(klevu){klevu.extend({analyticsUtil:{base:{storage:{dictionary:"analytics-util",term:"termList",click:"clickList",categoryClick:"categoryClickList",buy:"buyList"},getTermOptions:function(scope,isExtended){var analyticsTermOptions={klevu_term:scope.data.context.termOriginal?scope.data.context.termOriginal:"*",klevu_pageNumber:"",klevu_src:"",klevu_limit:"",klevu_sort:"",klevu_totalResults:"0",klevu_typeOfQuery:"WILDCARD_AND",filters:!1},currentSection=scope.data.context.section;if(!currentSection)return analyticsTermOptions;var reqQueries=klevu.getObjectPath(scope.data,"request.current.recordQueries");if(reqQueries||(reqQueries=klevu.getObjectPath(scope.data,"request.original.recordQueries")),reqQueries){var reqQueryObj=reqQueries.filter(function(obj){return obj.id==currentSection})[0];reqQueryObj&&(analyticsTermOptions.klevu_limit=reqQueryObj.settings.limit,analyticsTermOptions.klevu_sort=reqQueryObj.settings.sort,analyticsTermOptions.klevu_src="[[typeOfRecord:"+reqQueryObj.settings.typeOfRecords[0]+"]]")}var resQueries=scope.data.response.current.queryResults;if(resQueries){var resQueryObj=resQueries.filter(function(obj){return obj.id==currentSection})[0];if(resQueryObj){analyticsTermOptions.klevu_totalResults=resQueryObj.meta.totalResultsFound,analyticsTermOptions.klevu_typeOfQuery=resQueryObj.meta.typeOfSearch;var productListLimit=resQueryObj.meta.noOfResults;if(analyticsTermOptions.klevu_pageNumber=Math.ceil(resQueryObj.meta.offset/productListLimit)+1,isExtended){var selectedFiltersStr=" [[",isAnyFilterSelected=!1;klevu.each(resQueryObj.filters,function(key,filter){"SLIDER"==filter.type?filter.start==filter.min&&filter.end==filter.max||(isAnyFilterSelected&&(selectedFiltersStr+=";;"),isAnyFilterSelected=!0,selectedFiltersStr+=filter.key+":"+filter.start+" - "+filter.end):klevu.each(filter.options,function(key,option){option.selected&&(isAnyFilterSelected&&(selectedFiltersStr+=";;"),isAnyFilterSelected=!0,selectedFiltersStr+=filter.key+":"+option.name)})}),selectedFiltersStr+="]]",isAnyFilterSelected&&(analyticsTermOptions.filters=!0,analyticsTermOptions.klevu_term+=selectedFiltersStr)}}}return analyticsTermOptions},getProductDetailsFromId:function(productId,scope){var product,dataListId=scope.data.context.section,results=scope.data.response.current.queryResults;if(results){var dataList=results.filter(function(obj){return obj.id==dataListId})[0];if(dataList){var matchedProduct=dataList.records.filter(function(prod){return prod.id==productId})[0];matchedProduct&&(product=matchedProduct)}}return product},getDetailsFromURLAndName:function(url,name,scope,dataListId){var category={},results=scope.data.response.current.queryResults;if(results){var categoryList=results.filter(function(obj){return obj.id==dataListId})[0];if(categoryList){var matchedCategory=categoryList.records.filter(function(cat){return cat.name==name&&cat.url==url})[0];matchedCategory&&(category=matchedCategory)}}return category},storeAnalyticsEvent:function(dictionary,element,eventOptions){var autoSug=klevu.dictionary(dictionary);if(autoSug&&eventOptions){autoSug.setStorage("local"),autoSug.mergeFromGlobal();var dataList=[],existingDataList=autoSug.getElement(element);existingDataList&&existingDataList.length&&existingDataList!=element?(existingDataList=JSON.parse(existingDataList)).length&&(existingDataList.push(eventOptions),dataList=existingDataList):dataList.push(eventOptions),autoSug.addElement(element,JSON.stringify(dataList)),autoSug.mergeToGlobal()}},registerAutoSuggestProductClickEvent:function(scope,className,dictionary,element){var target=klevu.getSetting(scope.settings,"settings.search.searchBoxTarget");klevu.each(klevu.dom.find(".trackProductClick",target),function(key,value){klevu.event.attach(value,"click",function(event){var dataSection,productId=value.dataset.id,searchResultContainer=klevu.dom.find(className,target)[0];if(searchResultContainer&&(dataSection=searchResultContainer.dataset.section),dataSection&&(scope.data.context.section=dataSection,productId)){var product=klevu.analyticsUtil.base.getProductDetailsFromId(productId,scope);if(product){var termOptions=klevu.analyticsUtil.base.getTermOptions(scope);termOptions&&(termOptions.klevu_keywords=termOptions.klevu_term,termOptions.klevu_productId=product.id,termOptions.klevu_productName=product.name,termOptions.klevu_productUrl=product.url,termOptions.klevu_src="[[typeOfRecord:"+product.typeOfRecord+";;template:quick-search]]",delete termOptions.klevu_term,klevu.analyticsUtil.base.storeAnalyticsEvent(dictionary,element,termOptions))}}},!0)})},registerAutoSuggestTermEvent:function(scope,className,dictionary,element){var target=klevu.getSetting(scope.settings,"settings.search.searchBoxTarget");klevu.each(klevu.dom.find(className,target),function(key,value){klevu.each(klevu.dom.find(".klevu-track-click",value),function(key,sugEle){klevu.event.attach(sugEle,"click",function(event){var dataSection,searchResultContainer=klevu.dom.find(".klevuQuickSearchResults",target)[0];if(searchResultContainer&&(dataSection=searchResultContainer.dataset.section),dataSection){scope.data.context.section=dataSection;var suggestionText=sugEle.dataset.content,termOptions=klevu.analyticsUtil.base.getTermOptions(scope,!0);termOptions&&(termOptions.klevu_originalTerm=termOptions.klevu_term,termOptions.klevu_term=suggestionText,termOptions.klevu_src="[[template:ac-suggestions]]",klevu.analyticsUtil.base.storeAnalyticsEvent(dictionary,element,termOptions))}})})})},registerAutoSuggestPageClickEvent:function(scope,className,dataListId,dictionary,element){var target=klevu.getSetting(scope.settings,"settings.search.searchBoxTarget");klevu.each(klevu.dom.find(className,target),function(key,value){klevu.each(klevu.dom.find(".klevu-track-click",value),function(key,catEle){klevu.event.attach(catEle,"click",function(event){var url=catEle.dataset.url,catName=catEle.dataset.name,category=klevu.analyticsUtil.base.getDetailsFromURLAndName(url,catName,scope,dataListId),termOptions=klevu.analyticsUtil.base.getTermOptions(scope);termOptions&&(termOptions.klevu_keywords=termOptions.klevu_term,termOptions.klevu_productId=category.id,termOptions.klevu_productName=category.name,termOptions.klevu_productUrl=category.url,termOptions.klevu_src="[[typeOfRecord:"+category.typeOfRecord+";;template:quick-search]]",delete termOptions.klevu_term,klevu.analyticsUtil.base.storeAnalyticsEvent(dictionary,element,termOptions))})})})},registerLandingProductClickEvent:function(scope,dictionary,element){var target=klevu.getSetting(scope.settings,"settings.search.searchBoxTarget");klevu.each(klevu.dom.find(".klevuProductClick",target),function(key,value){klevu.event.attach(value,"click",function(event){var parent=klevu.dom.helpers.getClosest(value,".klevuProduct");if(parent&&null!=parent){var productId=parent.dataset.id;if(productId){var product=klevu.analyticsUtil.base.getProductDetailsFromId(productId,scope);if(product){var termOptions=klevu.analyticsUtil.base.getTermOptions(scope);termOptions&&(termOptions.klevu_keywords=termOptions.klevu_term,termOptions.klevu_productId=product.id,termOptions.klevu_productName=product.name,termOptions.klevu_productUrl=product.url,termOptions.klevu_src="[[typeOfRecord:"+product.typeOfRecord+";;template:landing]]",delete termOptions.klevu_term,klevu.analyticsUtil.base.storeAnalyticsEvent(dictionary,element,termOptions))}}}})})},sendAnalyticsEventsFromStorage:function(dictionary,element){var autoSug=klevu.dictionary(dictionary);autoSug.setStorage("local"),autoSug.mergeFromGlobal();var storedEvents=autoSug.getElement(element);storedEvents&&storedEvents!=element&&(storedEvents=JSON.parse(storedEvents),klevu.each(storedEvents,function(index,value){delete value.filters,element==klevu.analyticsUtil.base.storage.click?klevu.analyticsEvents.click&&klevu.analyticsEvents.click(value):element==klevu.analyticsUtil.base.storage.buy?klevu.analyticsEvents.buy&&klevu.analyticsEvents.buy(value):element==klevu.analyticsUtil.base.storage.categoryClick?klevu.analyticsEvents.catclick&&klevu.analyticsEvents.catclick(value):klevu.analyticsEvents.term(value)}),autoSug.addElement(element,""),autoSug.mergeToGlobal())},getCategoryViewOptions:function(scope){var analyticsCategoryOptions={klevu_categoryName:"unknown",klevu_src:"unknown",klevu_categoryPath:"unknown",klevu_productIds:"unknown",klevu_pageStartsFrom:"unknown",filters:!1},currentSection=scope.data.context.section;if(!currentSection)return analyticsCategoryOptions;var reqQueries=scope.data.request.current.recordQueries;if(reqQueries){var reqQueryObj=reqQueries.filter(function(obj){return obj.id==currentSection})[0];reqQueryObj&&(reqQueryObj.settings.query&&reqQueryObj.settings.query.categoryPath&&(analyticsCategoryOptions.klevu_categoryName=reqQueryObj.settings.query.categoryPath),analyticsCategoryOptions.klevu_limit=reqQueryObj.settings.limit,analyticsCategoryOptions.klevu_sort=reqQueryObj.settings.sort,analyticsCategoryOptions.klevu_src="[[typeOfRecord:"+reqQueryObj.settings.typeOfRecords[0]+"]]")}var resQueries=scope.data.response.current.queryResults;if(resQueries){var resQueryObj=resQueries.filter(function(obj){return obj.id==currentSection})[0];resQueryObj&&(analyticsCategoryOptions.klevu_pageStartsFrom=resQueryObj.meta.offset,resQueryObj.records&&resQueryObj.records.length&&(analyticsCategoryOptions.klevu_productIds="",klevu.each(resQueryObj.records,function(key,value){analyticsCategoryOptions.klevu_productIds&&"unknown"!==analyticsCategoryOptions.klevu_productIds&&value.id&&(analyticsCategoryOptions.klevu_productIds+=","),value.id&&(analyticsCategoryOptions.klevu_productIds+=value.id)}),resQueryObj.records[0].klevu_category&&(analyticsCategoryOptions.klevu_categoryPath=resQueryObj.records[0].klevu_category)))}return analyticsCategoryOptions},registerCategoryProductClickEvent:function(scope,dictionary,element){var target=klevu.getSetting(scope.settings,"settings.search.searchBoxTarget");klevu.each(klevu.dom.find(".klevuProductClick",target),function(key,value){klevu.event.attach(value,"click",function(event){var parent=klevu.dom.helpers.getClosest(value,".klevuProduct");if(parent&&null!=parent){var productId=parent.dataset.id;if(productId){var product=klevu.analyticsUtil.base.getProductDetailsFromId(productId,scope);if(product){var categoryOptions=klevu.analyticsUtil.base.getCategoryViewOptions(scope);categoryOptions.klevu_productId=product.id,categoryOptions.klevu_productName=product.name,categoryOptions.klevu_productUrl=product.url,categoryOptions.klevu_src="[[typeOfRecord:"+product.typeOfRecord+";;template:category]]",categoryOptions.klevu_productSku=product.sku,categoryOptions.klevu_salePrice=product.salePrice,categoryOptions.klevu_productRatings=product.rating,categoryOptions.klevu_productPosition=categoryOptions.klevu_pageStartsFrom,delete categoryOptions.klevu_term,delete categoryOptions.klevu_pageStartsFrom,klevu.analyticsUtil.base.storeAnalyticsEvent(dictionary,element,categoryOptions)}}}})})}}}}),klevu.analyticsUtil.build=!0}(klevu),klevu.coreEvent.build({name:"analyticsPowerUp",fire:function(){return!!(klevu.getSetting(klevu.settings,"settings.localSettings",!1)&&klevu.analytics.build&&klevu.analyticsUtil.build)},maxCount:500,delay:30}),klevu.coreEvent.attach("analyticsPowerUp",{name:"attachSendRequestEvent",fire:function(){klevu.analyticsUtil.base.sendAnalyticsEventsFromStorage(klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.term),klevu.analyticsUtil.base.sendAnalyticsEventsFromStorage(klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.click),klevu.analyticsUtil.base.sendAnalyticsEventsFromStorage(klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.categoryClick),klevu.analyticsUtil.base.sendAnalyticsEventsFromStorage(klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.buy)}}),klevu.coreEvent.attach("setRemoteConfigQuick",{name:"attachQuickSearchAnalyticsEvents",fire:function(){klevu.each(klevu.search.extraSearchBox,function(key,box){box.getScope().element.kScope.analyticsReqTimeOut=null,box.getScope().chains.template.events.add({name:"doAnalytics",fire:function(data,scope){box.getScope().element.kScope.analyticsReqTimeOut&&clearTimeout(box.getScope().element.kScope.analyticsReqTimeOut);var target=klevu.getSetting(scope.kScope.settings,"settings.search.searchBoxTarget"),searchResultContainer=klevu.dom.find(".klevuQuickSearchResults",target)[0],dataSection=!1;searchResultContainer&&(dataSection=searchResultContainer.dataset.section),dataSection&&(scope.kScope.data.context.section=dataSection,box.getScope().element.kScope.analyticsReqTimeOut=setTimeout(function(){var termOptions=klevu.analyticsUtil.base.getTermOptions(box.getScope().element.kScope,!0);termOptions&&(termOptions.klevu_src=termOptions.klevu_src.replace("]]",";;template:quick-search]]"),klevu.analyticsEvents.term(termOptions)),box.getScope().element.kScope.analyticsReqTimeOut=null},300))}}),box.getScope().chains.template.events.add({name:"doResultProductsAnalytics",fire:function(data,scope){klevu.analyticsUtil.base.registerAutoSuggestTermEvent(scope.kScope,".klevuAutosuggestions",klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.term),klevu.analyticsUtil.base.registerAutoSuggestPageClickEvent(scope.kScope,".klevuCmsSuggestions","cmsCompressed",klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.click),klevu.analyticsUtil.base.registerAutoSuggestPageClickEvent(scope.kScope,".klevuCategorySuggestions","categoryCompressed",klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.click),klevu.analyticsUtil.base.registerAutoSuggestProductClickEvent(scope.kScope,".klevuQuickSearchResults",klevu.analyticsUtil.base.storage.dictionary,klevu.analyticsUtil.base.storage.click)}})})}}),function(klevu){var productDataModification={updateImagePath:function(scope){var data=scope.data,queryResults=klevu.getObjectPath(data,"response.current.queryResults");queryResults&&klevu.each(queryResults,function(key,queryResult){queryResult&&queryResult.records&&klevu.each(queryResult.records,function(rKey,record){"undefined"==typeof klevu_pubIsInUse||klevu_pubIsInUse?record.image=record.image?record.image.replace("needtochange/",""):"":record.image=record.image?record.image.replace("needtochange/","pub/"):""})})}};klevu.extend(!0,klevu.search.modules,{productDataModification:{base:productDataModification,build:!0}})}(klevu),klevu.coreEvent.attach("setRemoteConfigQuick",{name:"updateMagentoSearchResultProductImagePath",fire:function(){klevu.each(klevu.search.extraSearchBox,function(key,box){box.getScope().chains.template.process.success.add({name:"updateProductImagePath",fire:function(data,scope){var productDataModification=klevu.search.modules.productDataModification;productDataModification&&productDataModification.base.updateImagePath(scope.kScope)}})})}}),window.addEventListener("click",function(e,i){var targetId=jQuery(e.target).attr("id"),targetCl=jQuery(e.target).hasClass("nav-sections");klevu.each(klevu.search.extraSearchBox,function(key,box){if(!klevu.getSetting(box.getScope().settings,"settings.search.fullPageLayoutEnabled",!0)&&("klevuOverlay"==targetId||"klevuClose"==targetId||targetCl)){var target=klevu.getSetting(klevu.search.active.getScope().settings,"settings.search.searchBoxTarget"),overlay=document.getElementById("klevuOverlay");target.style="display: none !important;",overlay.style="display: none;",document.getElementsByTagName("body")[0].dataset.klevu="closed"}})});