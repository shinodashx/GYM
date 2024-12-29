// =================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// TopicCommentApproves is the golang structure of table topic_comment_approves for DAO operations like Where/Data.
type TopicCommentApproves struct {
	g.Meta     `orm:"table:topic_comment_approves, do:true"`
	Id         interface{} // ID
	Type       interface{} // TYPE
	UpdateTime *gtime.Time // Update time
	UserId     interface{} // USER_ID
	CommentId  interface{} // topic_comment_ID
}
