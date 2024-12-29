const order = [{
  'order': {
    'id': 10,
    'userId': 76,
    'status': 10,
    'startTime': '1973-02-04 16:18:11',
    'amount': 6,
    'orderCode': '53',
    'placeId': 54,
    'time': '2008-12-29 06:05:59',
    'endTime': '1984-01-10 20:51:09'
  },
  'place': {
    'facilityId': 66,
    'name': '通式复回',
    'id': 38,
    'cost': 61,
    'description': '角提议机党受品全风几习形或立备。照红三数正自表论权受要联积化被。华时地量按二建设派构育元例支除。商共会圆走省日上业主就决压学却队。克时花白政国记我命马公实选战后条包。论设回外为年江整名如们米至。'
  }
},
{
  'place': {
    'description': '表专米第联值况步便家意我已目北济地。术思大性头何标一己通温因划法算说。酸达边例周装建也而革根连如可。风张米便数色去满往程管设角元实说而。说维们完近着具及经越二县近。指确低京四五难劳十议级心却更。',
    'id': 93,
    'facilityId': 92,
    'cost': 64,
    'name': '工结十界长者'
  },
  'order': {
    'startTime': '1983-02-16 06:25:14',
    'status': 6,
    'orderCode': '51',
    'amount': 44,
    'id': 26,
    'userId': 83,
    'time': '1992-10-03 09:58:42',
    'placeId': 70,
    'endTime': '1980-07-07 15:08:11'
  }
}, {
  'order': {
    'placeId': 77,
    'endTime': '1979-01-30 04:11:48',
    'time': '2006-08-28 20:14:25',
    'status': 64,
    'amount': 43,
    'orderCode': '65',
    'startTime': '2008-08-29 12:14:21',
    'id': 17,
    'userId': 80
  },
  'place': {
    'name': '理论观红比',
    'id': 95,
    'cost': 76,
    'description': '线程民也交子直用热天西来改。场价还名复低和何存于值风每金应。积华历我况了温程月只速着时半问治。',
    'facilityId': 35
  }
},
{
  'order': {
    'id': 62,
    'amount': 56,
    'status': 2,
    'orderCode': '22',
    'endTime': '2005-07-22 14:52:04',
    'userId': 18,
    'startTime': '1984-08-21 06:22:43',
    'placeId': 56,
    'time': '1972-05-24 07:31:39'
  },
  'place': {
    'facilityId': 22,
    'description': '件持专较于便律选安成学千京名。感使关山分识南系现达万量里度叫条话。立花消民斯通候历组而风改组小提。子他深音次没声类事共必保难列热阶产革。外速据真建次而且接价大北对该。反维起带形于据适机西很本。便素因有做情持道己列你总称里。',
    'cost': 28,
    'id': 36,
    'name': '做较月式'
  }
},
{
  'order': {
    'userId': 4,
    'time': '2002-07-20 02:09:02',
    'orderCode': '29',
    'status': 93,
    'id': 53,
    'startTime': '2006-04-01 22:11:09',
    'placeId': 87,
    'endTime': '2005-11-04 19:49:29',
    'amount': 87
  },
  'place': {
    'cost': 49,
    'name': '都出新基儿',
    'description': '四共龙影往本快调酸同老斗等特。道革亲格许先里何较片此线约一基。一面量格多色小式为都界社面民。七题照实百型及在定选运从使回常。生小把这准精周风程通可形按公形。',
    'id': 53,
    'facilityId': 15
  }
},
{
  'order': {
    'time': '1983-09-01 15:11:06',
    'startTime': '1980-03-02 21:38:08',
    'id': 35,
    'status': 7,
    'orderCode': '77',
    'endTime': '1978-09-29 19:40:22',
    'placeId': 52,
    'amount': 55,
    'userId': 85
  },
  'place': {
    'cost': 79,
    'description': '高起变般列层等变象作快相派全。一石展去众海家情用日除金走生。研国海科林青张知别什角东方力造层气住。入对年边采全非压运较风做集。实装规算儿该路照基题海向青成力多。心下委共农作局代声去样本头。张非进给然将斗例海对质几十带认温。',
    'id': 90,
    'name': '研说便府',
    'facilityId': 23
  }
},
{
  'place': {
    'description': '有进选机除史格家影位电军量。低今江证局儿儿好走法院清支产力。准计自此同运所体时日心去究养之。现容近结确西论四车华取好己出。分持整议三中约方连并使流来。',
    'id': 73,
    'cost': 67,
    'name': '文应低布合',
    'facilityId': 6
  },
  'order': {
    'amount': 40,
    'id': 97,
    'orderCode': '90',
    'startTime': '1993-01-05 07:53:30',
    'userId': 59,
    'status': 28,
    'time': '2022-02-19 04:19:48',
    'placeId': 67,
    'endTime': '2003-01-28 14:03:38'
  }
}
]

// Simulated API
module.exports = [
  // get order list
  {
    url: '/api/v1/order/all',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'success',
        data: {
          'order': order
        }
      }
    }
  }
]
