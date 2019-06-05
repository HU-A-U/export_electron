function export_yiqidai() {
    ztData = getAllzt();
    for (zt in ztData) {
        params = {
            customerId:zt[customerId],
            accountSetId:zt[accountSetId],
            customerName:zt[customerName],
            customerShortName:zt[customerName]
        };
        console.log(params)
    }
}

function auto_login() {
    //判断是否登陆成功
    account = get_login_name();
    if (!account) {
        res = to_login();
        if (!res) {
            alert('请手动登陆！')
        }
    }else {
        alert('登陆成功，开始导出')
    }
}

function to_login() {
    //获取登陆信息
    account = '15021292829';
    pwd = 'l15021292829';
    document.getElementById('id_0').value = account;
    document.getElementById('id_1').value = pwd;
    document.getElementsByClassName(' button button--block button--submit button--primary button--transition')[0].click()
    loginName = get_login_name();
    if (loginName === account) {
        return 'ok'
    }else {
        return ''
    }
}

function get_login_name() {
    //获取登陆的信息，进行对比
    $.ajax({
        type:'GET',
        url: 'https://17dz.com/xqy-portal-web/manage/login/getLoginSession?_=1544003601263',
        contentType:'application/json;charset=utf-8',
        success: function (result) {
            if(result.success) {
                account = res.body.loginName;
                    if (account) {
                        return account
                    }else {
                        return ''
                    }
            } else {
                return ''
            }
        }
    })
}

//获取所有的账套信息
function getAllzt() {
    //获取customerid
    CustomerId = getCustomerId();
    var data = {key: "", customerId: CustomerId};
    $.ajax({
        type:'POST',
        url: 'https://17dz.com/xqy-portal-web/manage/workbench/getAccountCustomers',
        contentType:'application/json;charset=utf-8',
        data : JSON.stringify(data),
        success: function (result) {
            if(result.success) {
                return result
            } else {
                return result;
            }
        }
    })
}


//先获取 getCustomerId
function getCustomerId(period){
    var myDate = new Date();
    period = myDate.getFullYear().toString();
    var data = {
        "pageNo":1,
        "pageSize":"500",
        "period":period,
        "customerNoOrNameLike":"",
        "accountCloseStatus":"",
        "sortField":"",
        "sortDirection":false
    };
    $.ajax({
        type:'POST',
        url: 'https://17dz.com/xqy-portal-web/manage/finance/queryCustomer',
        contentType:'application/json;charset=utf-8',
        data : JSON.stringify(data),
        success: function (result) {
            if(result.success) {
                return result
            } else {
                return result
            }
        }
    })
}


//切换账套,得到所有的期间,返回期间列表
function switchZt(params) {
    customerId = params['customerId'];
    accountSetId = params['accountSetId'];
    customerName = params['customerName'];
    customerShortName = params['customerShortName'];
    $.ajax({
        type:'PUT',
        url:'https://17dz.com/xqy-portal-web/finance/account/session/accountSet',
        data : {
            'customerId':customerId,
            'accountSetId':accountSetId,
            'customerName':customerName,
            'customerShortName':customerShortName,
            'platform':'yqdz',
        },
        dataType: 'json',
        success: function (result) {
            if(result.success) {

                top.khxx = result;
            } else {
                top.khxx = result;
            }
        }
    })
}

