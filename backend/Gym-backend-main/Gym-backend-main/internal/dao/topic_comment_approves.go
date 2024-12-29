// =================================================================================
// This is auto-generated by GoFrame CLI tool only once. Fill this file as you wish.
// =================================================================================

package dao

import (
	"Gym-backend/internal/dao/internal"
)

// internalTopicCommentApprovesDao is internal type for wrapping internal DAO implements.
type internalTopicCommentApprovesDao = *internal.TopicCommentApprovesDao

// topicCommentApprovesDao is the data access object for table topic_comment_approves.
// You can define custom methods on it to extend its functionality as you wish.
type topicCommentApprovesDao struct {
	internalTopicCommentApprovesDao
}

var (
	// TopicCommentApproves is globally public accessible object for table topic_comment_approves operations.
	TopicCommentApproves = topicCommentApprovesDao{
		internal.NewTopicCommentApprovesDao(),
	}
)

// Fill with you ideas below.
