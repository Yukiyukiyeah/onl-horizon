package routers

import (
	"net/http"
	"strings"

	"github.com/astaxie/beego/context"

	"github.com/opennetlab/onl-horizon/util"
)

func TransparentStatic(ctx *context.Context) {
	urlPath := ctx.Request.URL.Path
	if strings.HasPrefix(urlPath, "/api/") {
		return
	}

	path := "../ONL-Horizon/dist"
	if urlPath == "/" {
		path += "/index.html"
	} else {
		path += urlPath
	}

	if util.FileExist(path) {
		http.ServeFile(ctx.ResponseWriter, ctx.Request, path)
	} else {
		http.ServeFile(ctx.ResponseWriter, ctx.Request, "../ONL-Horizon/dist/index.html")
	}
}
