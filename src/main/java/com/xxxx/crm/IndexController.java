package com.xxxx.crm;

import com.xxxx.crm.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
@Controller
public class IndexController extends BaseController {

    //系统登录页
    //@return
    @RequestMapping("index")
    public String index(){
        return "index";
    }

    //系统界面欢迎页
    @RequestMapping("welcome")
    public String welcome(){
        return "welcome";
    }
    //系统界面欢迎页
    @RequestMapping("main")
    public String main(){
        return "main";
    }
}
