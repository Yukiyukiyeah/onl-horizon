package controllers

import "github.com/astaxie/beego"

type ApiController struct {
	beego.Controller
}

func (c *ApiController) GetJobs() {
	c.Data["json"] = "OK"
	c.ServeJSON()
}
