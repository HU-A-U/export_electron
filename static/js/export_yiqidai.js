function export_yiqidai(ztData) {
    ztBody = ztData.body;
    for (zt in ztData) {
        params = {
            customerId:ztBody[zt].customerId,
            accountSetId:ztBody[zt].accountSetId,
            customerName:ztBody[zt].customerName,
            customerShortName:ztBody[zt].customerName
        };
        console.log(params);
        //切换帐套，获取所有的期间
        khxx = switchZt(params);
        startQj = khxx.body.createPeriod;
        endQj = khxx.body.lastPeriod;
        console.log(startQj,endQj)
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
    document.getElementById('id__0').value = account;
    document.getElementById('id__1').value = pwd;
    document.getElementsByClassName(' button button--block button--submit button--primary button--transition')[0].click();
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
                        res = account
                    }else {
                        res = ''
                    }
            } else {
                res = ''
            }
        }
    });
    return res
}

//获取所有的账套信息
function getAllzt(customerId) {
    //获取customerid
    var data = {key: "", customerId: customerId};
    $.ajax({
        type:'POST',
        url: 'https://17dz.com/xqy-portal-web/manage/workbench/getAccountCustomers',
        contentType:'application/json;charset=utf-8',
        data : JSON.stringify(data),
        success: function (result) {
            export_yiqidai(result)
        }
    });
}


//先获取 getCustomerId
function getCustomerId(){
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
            customerId = result.body.list[0].customerId;
            getAllzt(customerId)
        }
    });
}


//切换账套,得到所有的期间,返回期间列表
function switchZt(params) {
    // customerId = params.customerId;
    // accountSetId = params.accountSetId;
    // customerName = params.customerName;
    // customerShortName = params.customerShortName;
    res = '';
    params.platform='yqdz';
    $.ajax({
        type:'PUT',
        url:'https://17dz.com/xqy-portal-web/finance/account/session/accountSet',
        data : params,
        // data : {
        //     'customerId':customerId,
        //     'accountSetId':accountSetId,
        //     'customerName':customerName,
        //     'customerShortName':customerShortName,
        //     'platform':'yqdz',
        // },
        dataType: 'json',
        success: function (result) {
            res = result
        }
    });
    return res
}

