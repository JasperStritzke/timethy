package ui

import (
	"embed"
	"net/http"
	"sync"
)

//go:embed dist
var DistFS embed.FS

var (
	httpFS     http.FileSystem
	httpFSSync sync.Once
)

func GetHttpFS() http.FileSystem {
	httpFSSync.Do(func() {
		httpFS = http.FS(DistFS)
	})

	return httpFS
}
