// ================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// You can delete these comments if you wish manually maintain this interface file.
// ================================================================================

package service

type (
	INotice interface{}
)

var (
	localNotice INotice
)

func Notice() INotice {
	if localNotice == nil {
		panic("implement not found for interface INotice, forgot register?")
	}
	return localNotice
}

func RegisterNotice(i INotice) {
	localNotice = i
}
