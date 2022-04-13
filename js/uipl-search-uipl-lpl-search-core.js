/**
 * file : uipl-lpl-search-core.js
 * Description: Provide some core functionality to "autocomplete search widget" and "click stream widget"
 * Usage: 1. change baseApi in uipl.baseApi (provided by uipl to search and click stream)
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

    if(!$._uipl){
        $._uipl = {};
    }
    var uipl = $._uipl;
    // uipl.baseApi = 'https://18fyjjinyb.execute-api.ap-south-1.amazonaws.com/prod/';
    uipl.baseApi = 'https://1xviewapimaster.lalpathlabs.com/';
    uipl.uipl_user_session_uid_key = 'uipl_user_session_uid';
    uipl.uipl_x_api_key = '737ae272-249e-49dc-8f44-9703c9c0db36';
    uipl.uipl_test_search_response_uid_key = 'uipl_test_search_response_uid';

	/*
	 *   returns a unique id
	 */
    uipl.gen_UID = function() {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4() + '-' + Date.now();
    };

    uipl.getUserSessionUID = function () {
        var uid = null;
        try {
            uid = localStorage.getItem(uipl.uipl_user_session_uid_key);
            if(uid){
                return uid;
            }
            var newUID = uipl.gen_UID();
            localStorage.setItem(uipl.uipl_user_session_uid_key,newUID);
            return newUID;
        }catch(e){
            return uid;
        }
    };

    uipl.getTestResponseUID = function () {
        try {
            var uid = localStorage.getItem(uipl.uipl_test_search_response_uid_key);
            if(uid){
                return uid;
            }
        }catch(e){
            console.log(e);

        }
        return '';
    };
});
