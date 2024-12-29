// =================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// Subscription is the golang structure of table subscription for DAO operations like Where/Data.
type Subscription struct {
	g.Meta           `orm:"table:subscription, do:true"`
	Id               interface{} // ID
	UserId           interface{} //
	StartTime        *gtime.Time //
	EndTime          *gtime.Time //
	SubscriptionType interface{} //
	Status           interface{} //
}
