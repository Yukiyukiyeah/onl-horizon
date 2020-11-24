package routers

import (
	"github.com/astaxie/beego"

	"github.com/opennetlab/onl-horizon/controllers"
)

func init() {
	initAPI()
}

func initAPI() {
	ns :=
		beego.NewNamespace("/api",
			beego.NSInclude(
				&controllers.ApiController{},
			),
		)
	beego.AddNamespace(ns)

	beego.Router("/api/get-jobs", &controllers.ApiController{}, "POST:GetJobs")
}
