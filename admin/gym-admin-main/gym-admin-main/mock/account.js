const user = [
  {
    'id': 13,
    'username': '2332',
    'password': 'e77dbaf6759253c7c6d0efc5690369c7',
    'avatar': 'uploads/default.png',
    'email': '23322332@qq.com',
    'phone': '1333333333',
    'gender': 1,
    'updateTime': '2023-02-16 17:18:49',
    'role': 1,
    'loginTime': '2023-02-19 07:24:09'
  },
  {
    'id': 14,
    'username': '123456',
    'password': '40aa6972ef2749a4f97d7e031629c4a9',
    'avatar': 'uploads/default.png',
    'email': '123@123.com',
    'phone': '48911289489',
    'gender': 0,
    'updateTime': '2023-02-17 16:29:20',
    'role': 0,
    'loginTime': '2023-02-18 13:27:23'
  }, {
    'password': 'consequat cupidatat consectetur qui Excepteur',
    'id': 21,
    'updateTime': '2019-11-24 23:13:09',
    'role': 2,
    'phone': '18688613762',
    'avatar': 'http://dummyimage.com/100x100',
    'email': 'l.doarxr@qq.com',
    'gender': 26,
    'loginTime': '2020-03-06 00:15:18',
    'username': '唐杰'
  },
  {
    'email': 'y.hqdk@qq.com',
    'avatar': 'http://dummyimage.com/100x100',
    'phone': '18178915763',
    'updateTime': '1970-12-25 08:07:33',
    'loginTime': '2012-11-13 20:30:49',
    'id': 67,
    'username': '丁娜',
    'role': 2,
    'password': 'tempor consequat',
    'gender': 31
  },
  {
    'email': 'y.hqdk@qq.com',
    'avatar': 'http://dummyimage.com/100x100',
    'phone': '18178915763',
    'updateTime': '1970-12-25 08:07:33',
    'loginTime': '2012-11-13 20:30:49',
    'id': 67,
    'username': '1071556591',
    'role': 2,
    'password': 'Gaoerjun1',
    'gender': 31
  },
  {
    'updateTime': '1971-12-22 03:51:18',
    'gender': 7,
    'phone': '18134877933',
    'username': '罗娟',
    'password': 'tempor aliqua dolor in non',
    'id': 47,
    'email': 'w.whqwuesv@qq.com',
    'avatar': 'http://dummyimage.com/100x100',
    'role': 0,
    'loginTime': '2001-08-05 11:25:07'
  }
]

// Simulated API
module.exports = [
  // get user list
  {
    url: '/api/v1/user/list',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        message: 'success',
        data: {
          'user': user
        }
      }
    }
  }
]
