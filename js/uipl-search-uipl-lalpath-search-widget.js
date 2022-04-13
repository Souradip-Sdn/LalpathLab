/**
 * file : uipl-lalpath-search-widget.js
 * Description: To render autocomplete search widget
 * Usage: 1. put an input tag like <input id="someWidgetId"/>
 *        2. assign widgetId = "someWidgetId" to render autocomplete search widget
 * @required libraries:
 *      http://code.jquery.com/jquery-1.8.3.js,
 *      http://code.jquery.com/ui/1.9.2/jquery-ui.js
 *      uipl-lpl-search-core.js
 *
 * Created by: Umbrella infocare Pvt. Ltd. on May'09
 * Url: http://www.umbrellainfocare.com
 */

$(function () {

    'use strict';
    var uipl = $._uipl || false;
    if(!uipl){
        throw('Please import uipl-lpl-search-core.js [Dependency]');
    }
    var widgetId = 'uipl-lalpath-search-widget';
    var widgetHashId = '#' + widgetId;
    var result_size = 2;
    var autocomplete_delay = 200; //in Millisecond
    var autocomplete_minLength = 2; // min characters
    var baseWebURL = 'https://www.lalpathlabs.com';
    var icon_base_path = 'https://d2qhgd0topi90o.cloudfront.net/website/icons/';
    var highlight_search = false;

    var category_images = {
        'test':'blood-test.png',
        'speciality':'speciality.png',
        'disease':'disease.png',
        'location':'location.png',
        'suggestion':'search.png',
        'radiology_test':'radiology.png',
        'radiology_location':'location.png',
    };



    var get_icon_path = function(item){
        if(!item){
            return '';
        }
        if(typeof(category_images[item['category']]) === 'undefined'){
            return '';
        }
        var icon_image = icon_base_path + (category_images[item['category']] ? category_images[item['category']] : '');
        var imgTag = '<img src="'+ icon_image + '" class="icon-image"/>';
        return imgTag;
    };

    var get_highlighted_content = function(label_content){
        var queryString = $(widgetHashId).val();
        if(!queryString){
            return '';
        }
        queryString = queryString.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
        var pattern = new RegExp("("+queryString+")", "gi");
        label_content = label_content.replace(pattern, "<span class=\"text-bold\">$1</span>");
        label_content = label_content.replace(/(<span class=\"text-bold\">[^<>]*)((<[^>]+>)+)([^<>]*<\/span>)/,"$1</span>$2<span class=\"text-bold\">$4");
        return label_content;
    };

    var _uipl_autoComplete = {

        onSelectItem : function (event, ui) {
            var queryString = $(widgetHashId).val();
            var url = baseWebURL + '/' + ui.item['url']+'?q='+queryString;
            window.location.href = url;
            if (ui && ui.item) {
                $(widgetHashId).val(ui.item.value);
            }
        },
        onGetData : function (request, response) {
            var user_session_uid = uipl.getUserSessionUID();
            var currentcity = "others";
            if ($.cookie('selectedCity') != null) {
                currentcity = $.cookie('selectedCity').replace("-", " ");
            }
          
          
            // var url = uipl.baseApi + "api-v2/autocomplete?q=" + request.term+ '&result_size=' + result_size + '&user_session_uid=' + user_session_uid;
            var url = uipl.baseApi + "v1/test-center/search?search_string=" + request.term + '&result_size=' + result_size + '&user_session_uid=' + user_session_uid+'&city_name='+currentcity;
            $.ajaxSetup({
                headers : {
                    'x-api-key' : uipl.uipl_x_api_key,
                }
            });
            $.getJSON(url, function (data) {
                try{
                    localStorage.setItem(uipl.uipl_test_search_response_uid_key,data['response_uid']);
                }catch(e){
                    console.log(e);
                }
                response(data['result']);
            });
        }
    };

    $.widget("custom.uipl_autoComplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this;
            var data = {};

            for (var i = 0; i < items.length; i++) {
                if (data[items[i].category] === undefined) {
                    data[items[i].category] = [];
                }
                data[items[i].category].push(items[i]);
            }

            for (var key in data) {
                for (var i = 0; i < data[key].length; i++) {
                    // if (i === 0) {
                    //     ul.append("<li class='ui-autocomplete-category'>" + data[key][i].category + "</li>");
                    // }
                    if(data[key][i]['category'] === 'suggestion'){
                        data[key][i]['url'] = 'search.aspx?q=' + data[key][i]['label'];
                    }
                    var icon = get_icon_path(data[key][i]);
                    var label_content = data[key][i]['label'];
                    if(highlight_search){
                        label_content = get_highlighted_content(label_content);
                    }
                    var label = [
                        '<span class="img-container">',
                        icon,
                        '</span>',
                        '<span class="content">' + label_content + '</span>'
                    ].join('');
                    data[key][i]['label'] = label;
                    // console.dir(xyx)
                    that._renderItemData(ul, data[key][i]);
                    // that._renderItem
                }
            }
            // var link = baseWebURL + '/search.aspx?q=' + $(widgetHashId).val();
            // ul.append("<li class='ui-autocomplete-see-more' role=''><a href='" + link + "'>see more...</a></li>");
        },
        _renderItemData : function (ul, item) {
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        }
    });

    $(widgetHashId).uipl_autoComplete({
        delay: autocomplete_delay,
        source: _uipl_autoComplete.onGetData,
        select: _uipl_autoComplete.onSelectItem,
        minLength: autocomplete_minLength
    });

});
