// ================================================================================
// Code generated by GoFrame CLI tool. DO NOT EDIT.
// You can delete these comments if you wish manually maintain this interface file.
// ================================================================================

package service

import (
	"Gym-backend/internal/model"
	"context"

	"github.com/gogf/gf/v2/net/ghttp"
)

type (
	IBizCtx interface {
		Init(r *ghttp.Request, customCtx *model.Context)
		Get(ctx context.Context) *model.Context
		GetSession(ctx context.Context) *ghttp.Session
		GetUser(ctx context.Context) *model.ContextUser
		SetUser(ctx context.Context, user *model.ContextUser)
	}
)

var (
	localBizCtx IBizCtx
)

func BizCtx() IBizCtx {
	if localBizCtx == nil {
		panic("implement not found for interface IBizCtx, forgot register?")
	}
	return localBizCtx
}

func RegisterBizCtx(i IBizCtx) {
	localBizCtx = i
}
