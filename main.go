package main

import (
	"agile-boards/apis"
	"log"
)

func main() {
	api := apis.InitApi()
	log.Fatal(api.Run(":8080"))
}
