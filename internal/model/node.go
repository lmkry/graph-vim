package model

type Node struct {
	ID        string
	Text      string
	X, Y      float64
	Neighbors map[string]string
}
