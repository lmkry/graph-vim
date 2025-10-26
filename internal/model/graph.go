package model

import (
	"sync"
)

type Graph struct {
	Nodes []*Node
	mu    sync.Mutex
}

func NewGraph() *Graph {
	return &Graph{
		Nodes: make([]*Node, 0),
	}
}

func (g *Graph) AddNode() []*Node {
	g.mu.Lock()

	newNode := &Node{
		X: float64(50 + (len(g.Nodes) * 20 % 300)),
		Y: float64(50 + (len(g.Nodes) * 35 % 250)),
	}
	g.Nodes = append(g.Nodes, newNode)

	g.mu.Unlock()
	return g.GetNodes(); 
}

func (g *Graph) DeleteNode() []*Node {
	g.mu.Lock()

	if len(g.Nodes) > 0 {
		g.Nodes = g.Nodes[:len(g.Nodes)-1]
	}
	g.mu.Unlock()

	return g.GetNodes()
}

func (g *Graph) GetNodes() []*Node {
	g.mu.Lock()
	defer g.mu.Unlock()

	nodesCopy := make([]*Node, len(g.Nodes))
	copy(nodesCopy, g.Nodes)
	return nodesCopy
}
