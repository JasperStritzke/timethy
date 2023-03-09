package apis

import (
	"agile-boards/ui"
	"github.com/gin-gonic/gin"
	"net/http"
	"path"
	"strings"
)

func InitApi() *gin.Engine {
	engine := gin.New()

	api := engine.Group("/api")
	api.GET("/status", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "API is Running"})
	})

	engine.StaticFileFS("/index.html", "dist/main.html", ui.GetHttpFS())
	engine.StaticFileFS("/", "dist/main.html", ui.GetHttpFS())

	engine.NoRoute(func(ctx *gin.Context) {
		if strings.Contains(strings.ToLower(ctx.Request.URL.Path), "/api") {
			ctx.JSON(404, gin.H{"message": "Route not found"})
			return
		}

		ctx.FileFromFS(path.Join("dist/", ctx.Request.URL.Path), ui.GetHttpFS())
	})

	return engine
}
