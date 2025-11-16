package model

import (
  "fmt"
	"sync"
)

type Graph struct {
	Nodes []*Node
  NodesMap map[string]*Node
  availableIDs []string
  FocusedNodeID string
	mu    sync.Mutex
}

func NewGraph() *Graph {
	return &Graph{
		Nodes: make([]*Node, 0),
    NodesMap: make(map[string]*Node),
    availableIDs: initializeAvailableIDs(),
    FocusedNodeID: "",
	}
}

func (g *Graph) AddNode() *AddNodeResult {
	g.mu.Lock()

  if len(g.availableIDs) == 0 {
    g.mu.Unlock()
    return nil
  }
  nodeID := g.availableIDs[len(g.availableIDs) - 1]
  g.availableIDs = g.availableIDs[:len(g.availableIDs) - 1]

	newNode := &Node{
    ID: nodeID,
    Text: "",
		X: float64(50 + (len(g.Nodes) * 20 % 300)),
		Y: float64(50 + (len(g.Nodes) * 35 % 250)),
	}

	g.Nodes = append(g.Nodes, newNode)
  g.NodesMap[nodeID] = newNode
  g.FocusedNodeID = nodeID

	g.mu.Unlock()
	return &AddNodeResult{
    NodeID: nodeID,
    Nodes: g.GetNodes(),
  }
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

func initializeAvailableIDs() []string {
  ids := make([]string, 260)
  for i := 0; i < 260; i++ {
    counter := 259 - i
    letter := rune('A' + (counter/10))
    number := counter % 10
    ids[i] = fmt.Sprintf("%c%d", letter, number)
  }

  return ids
}

func (g *Graph) UpdateNodeText(nodeID string, text string) []*Node {
  g.mu.Lock()

  if node, exists := g.NodesMap[nodeID]; exists {
    node.Text = text
  }

  g.mu.Unlock()
  return g.GetNodes()
}
