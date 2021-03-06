/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';

    angular
        .module('app.client')
        .service('ClientService', ClientService);
    /*@ngNoInject*/
    function ClientService(TokenRestangular, $rootScope, $state, $translate) {
        var service = {
            getClientDetail: getClientDetail,
            getFriends : getFriends,
            getFriendCircle: getFriendCircle,
            getOtherCircles: getOtherCircles,
            addFriends: addFriends,
            respondToFriendRequest: respondToFriendRequest,
            getFriendRequests: getFriendRequests,
            getSentFriendRequests : getSentFriendRequest,
            getOrders: getOrders,
            getOrder: getOrder,
            updateOrderDetails: updateOrderDetails,
            updateOrder: updateOrder,
            printOrder: printOrder,
            getDiets: getDiets,
            getCurrentClient: getCurrentClient,
            getLanguageCode: getLanguageCode,
            updateClient : updateClient,

            getSetting: getSetting,
            getQuizClient: getQuizClient,
            getSumPrice: getSumPrice,
            updateLastCrossingTime: updateLastCrossingTime,
            getQuizPrize: getQuizPrize,
            sendEmail: sendEmail,
            addQuizClient: addQuizClient,
            startQuiz: startQuiz,

        };
        return service;

        function getClientDetail (clientId){
            //debugger;
            return TokenRestangular.all('client/'+clientId).customGET('');
        }

        function getFriends(query){
            //debugger;
            return TokenRestangular.all('clients?search='+query).customGET('');
        }
        function getFriendCircle(){
            //debugger;
            return TokenRestangular.all('client/friends').customGET('');
        }
        function getSetting(){
            //debugger;
            return TokenRestangular.all('client/quizsetting').customGET('');
        }
        function getSumPrice(){
            return TokenRestangular.all('orders_sum_price').customGET('');
        }
        function updateLastCrossingTime(){
            return TokenRestangular.all('client/updatelastcrossingtime').customGET('');
        }
        function getQuizPrize(){
            return TokenRestangular.all('client/quizPrize').customGET('');
        }
        function sendEmail(response){
            return TokenRestangular.all('client/sendEmail').customPOST(response);
        }
        function startQuiz(){
            //debugger;
            return TokenRestangular.all('client/question').customGET('');
        }
        function getQuizClient() {
            //debugger;
            // return TokenRestangular.all('client/quizsetting').customPOST(response);
            return TokenRestangular.all('client/quizclient').customGET('');
        }
        function addQuizClient(quizClient) {
            //debugger;
            return TokenRestangular.all('client/quizclient').customPOST(quizClient);
        }
        function getOtherCircles(){
            //debugger;
            return TokenRestangular.all('client/circles').customGET('');
        }
        function addFriends(clients){
            //debugger;
            return TokenRestangular.all('client/friends').customPOST(clients);
        }
        function respondToFriendRequest(response){
            //debugger;
            return TokenRestangular.all('client/respond').customPOST(response);
        }
        function getFriendRequests(){
            //debugger;
            return TokenRestangular.all('client/requests').customGET('');
        }
        function getSentFriendRequest(){
            //debugger;
            return TokenRestangular.all('client/sent_requests').customGET('');
        }
        function getOrders(currentPage) {
            //debugger;
            return TokenRestangular.all('orders_by_status?page='+ currentPage).customGET('');
        }

        function getOrder(orderId) {
            //debugger;
            return TokenRestangular.all('orders/' + orderId).customGET('');
        }
        
        function updateOrderDetails(orderDetails, source) {
            //debugger;
            if (!source){
                angular.forEach(orderDetails.orders_detail, function(item){
                    item.serve_at = moment(item.serve_at).format();
                    //debugger;
                });
            }
            return TokenRestangular.all('orders_detail').customPUT(orderDetails);
        }

        function updateOrder(order) {
            //debugger;
            return TokenRestangular.all('orders').customPUT(order);
        }

        function printOrder(orderId, lang) {
            return TokenRestangular.all('print_order/' + lang + '/' + orderId).customGET('');;
        }

        function getDiets(){
            return TokenRestangular.all('diet').customGET('');
        }

        function getCurrentClient(){
            return TokenRestangular.all('client').customGET('');
        }

        function getLanguageCode() {
            var langCode = {
                "en" : "ENG",
                "cs" : "CZE"
            }
            var currentLang = $translate.use();
            if (currentLang && currentLang in langCode) {
                return langCode[currentLang];
            }
            return "ENG";
        }

        function updateClient(client) {
            return TokenRestangular.all('client').customPUT(client);
        }
    }
})();
