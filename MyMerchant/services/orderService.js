import api, { setCtrlAction } from './api_pwa';
import moment from 'moment';
import { find } from 'lodash';
import { TICKET_STATUS, getDepots, getLocation } from '../utils/common';
import { getUserGuidId, getDepotIds } from '../utils/localStorage';

const apiVersion = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production')
  ? `shipping`
  : `v1/logistics/shipping`;

const orderService = function() {
}

orderService.getPendingOrders = function (keyword) {
  let url = `${apiVersion}/getTicketsWithStatus`;

  let shipperId = getUserGuidId();
  let depotIds = getDepotIds();
  let depots = getDepots(depotIds);

  let reqBody = {
    skip: 0,
    id: '',
    ticket_id: '',
    customer: '',
    search: keyword ? keyword : '',
    shipperId: [
      shipperId
    ],
    shipping_id: '',
    product: '',
    dateFrom: moment(new Date()).add(-10,'d').format('YYYY-MM-DD'),
    dateTo: moment(new Date()).add(10,'d').format('YYYY-MM-DD'),
    depots: depots,
    limit: 50
  };

  setCtrlAction('shipping', 'getTicketsWithStatus');
  return api.post(url, reqBody)
  .then(res => {
    const tickets = res.data.data.results;
    return tickets;
  }).catch(err => {
    throw err;
  });
}

orderService.getCompletedOrders = function (keyword) {
  let url = `${apiVersion}/getTicketsWithStatus`;

  let shipperId = getUserGuidId();
  let depotIds = getDepotIds();
  let depots = getDepots(depotIds);
  
  let reqBody = {
    skip: 0,
    id: '',
    ticket_id: '',
    customer: '',
    search: keyword ? keyword : '',
    shipperId: [
      shipperId
    ],
    shipping_id: '',
    product: '',
    isProcessing: false,
    dateFrom: moment(new Date()).add(-10,'d').format('YYYY-MM-DD'),
    dateTo: moment(new Date()).add(10,'d').format('YYYY-MM-DD'),
    depots: depots,
    limit: 50
  };

  setCtrlAction('shipping', 'getTicketsWithStatus');
  return api.post(url, reqBody)
  .then(res => {
    const tickets = res.data.data.results;
    return tickets;
  }).catch(err => {
    throw err;
  });
}

orderService.getOrderDetailById = function (ticketId, isProcessing) {
  let url = `${apiVersion}/getTicketsWithStatus`;

  let shipperId = getUserGuidId();
  let depotIds = getDepotIds();
  let depots = getDepots(depotIds);

  let reqBody = {
    skip: 0,
    id: '',
    ticket_id: ticketId,
    customer: '',
    shipperId: [
      shipperId
    ],
    shipping_id: '',
    product: '',
    isProcessing: (isProcessing === true) ? true : false,
    dateFrom: moment(new Date()).add(-10,'d').format('YYYY-MM-DD'),
    dateTo: moment(new Date()).add(10,'d').format('YYYY-MM-DD'),
    depots: depots,
    limit: 1
  };

  setCtrlAction('shipping', 'getTicketsWithStatus');
  return api.post(url, reqBody)
  .then(res => {
    const tickets = res.data.data.results;
    if(Array.isArray(tickets) && tickets.length) {
      let ticket = find(tickets, (item) => { return item.ticket_id === ticketId});
      if(Array.isArray(ticket.products) && ticket.products.length) {
        ticket.products.forEach(item => { item.isDelivery = true; });
      }
      return ticket;
    }
    else return null;
  }).catch(err => {
    throw err;
  });
}

orderService.takeTurn = function(turn_id) {
  let turnUrl = `${apiVersion}/takeTurn/${turn_id}`;
  setCtrlAction('shipping', 'takeTurn');
  return api.put(turnUrl)
  .then(res => {
    const data = res.data;    
    return data;
  }).catch(err => {
    throw err;
  });
}



orderService.confirmDeliverySuccess = function(id, order_id, order_code, order_version, imeiIds) {
  let updateUrl = `${apiVersion}/shipperUpdateTicket`;

  let depotIds = getDepotIds();
  let location = getLocation(depotIds);

  let reqBody = {
    ticket_id: id,
    data: {
      order_id: order_id,
      order_code: order_code,
      order_version: order_version,
      notes: 'Ticket is finished',
      cancelReason: 'Ticket is finished',
      imeis: imeiIds,
      status: TICKET_STATUS.REQUESTFINISH
    },
    location: location
  };

  setCtrlAction('shipping', 'shipperUpdateTicket');
  return api.put(updateUrl, reqBody)
  .then(res => {
    const data = res.data;
    return data;
  }).catch(err => {
    throw err;
  });
}

orderService.confirmDeliveryCancel = function(id, order_id, order_code, order_version, reason, notes, imeiIds) {
  let updateUrl = `${apiVersion}/shipperUpdateTicket`;

  let depotIds = getDepotIds();
  let location = getLocation(depotIds);

  let reqBody = {
    ticket_id: id,
    data: {
      order_id: order_id,
      order_code: order_code,
      order_version: order_version,
      notes: notes,
      cancelReason: reason,
      imeis: imeiIds,
      status: TICKET_STATUS.REQUESTCANCEL
    },
    location: location
  };

  setCtrlAction('shipping', 'shipperUpdateTicket');
  return api.put(updateUrl, reqBody)
  .then(res => {
    const data = res.data;
    return data;
  }).catch(err => {
    throw err;
  });
}

orderService.confirmDeliveryReturn = function(id, order_id, order_code, order_version, reason, notes, imeiIds) {
  let updateUrl = `${apiVersion}/shipperUpdateTicket`;

  let depotIds = getDepotIds();
  let location = getLocation(depotIds);

  let reqBody = {
    ticket_id: id,
    data: {
      order_id: order_id,
      order_code: order_code,
      order_version: order_version,
      notes: notes,
      cancelReason: reason,
      imeis: imeiIds,
      status: TICKET_STATUS.REQUESTCHANGE
    },
    location: location
  };

  setCtrlAction('shipping', 'shipperUpdateTicket');
  return api.put(updateUrl, reqBody)
  .then(res => {
    const data = res.data;
    return data;
  }).catch(err => {
    throw err;
  });
}

export default orderService;