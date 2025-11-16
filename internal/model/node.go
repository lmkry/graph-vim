package model

type Node struct {
  ID string
  Text string
	X, Y float64
}

type AddNodeResult struct {
  NodeID string
  Nodes []*Node
}
