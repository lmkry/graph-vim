package app

import (
	"context"
	"graph-vim/internal/model"
)

type App struct {
	ctx context.Context
	g   *model.Graph
}

func NewApp() *App {
	return &App{
		g: model.NewGraph(),
	}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) AddNode() []*model.Node {
	a.g.AddNode()
	return a.g.GetNodes()
}

func (a *App) DeleteNode() []*model.Node {
	a.g.DeleteNode()
	return a.g.GetNodes()
}

func (a *App) GetNodes() []*model.Node {
	return a.g.GetNodes()
}
