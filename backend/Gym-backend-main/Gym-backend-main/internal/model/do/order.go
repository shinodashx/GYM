// =================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// Order is the golang structure of table order for DAO operations like Where/Data.
type Order struct {
	g.Meta          `orm:"table:order, do:true"`
	Id              interface{} // ID
	UserId          interface{} // User id
	PlaceId         interface{} // Place ID
	Time            *gtime.Time // Order Time
	StartTime       *gtime.Time // Start time of the order
	EndTime         *gtime.Time // End time of the order
	Amount          interface{} // Amount of the order
	OrderCode       interface{} // Order code
	Status          interface{} // Status of the order
	Discount        interface{} //
	ParentOrderCode interface{} //
}
