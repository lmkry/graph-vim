package model

type GraphModel struct {
	Nodes     map[string]*Nodes
	Edges     map[string]*Edge
	UndoStack []interface{} // interface{} is a placeholder for the Command interface
	RedoStack []interface{} // interface{} is a placeholder for the Command interface
}
