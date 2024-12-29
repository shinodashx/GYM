import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import WithLayout from 'WithLayout';
// Available layouts
import {
  Main as MainLayout
} from './layouts';

// Pages
import {
  Facility as FacilityView,
  Membership as MembershipView,
  NotFound as NotFoundView,
  Home as HomeViewA,
  Places as PlacesView,
  Payfor as PayforView,
  PayforRegular as PayforRegularView,
  PayforSub as PayforSubView,
  Evaluation as EvaluationView,
  UpdateEvaluation as UpdateEvaluationView,
  Courses as CoursesView,
  Cours as CourseView,
  Activity as ActivityView,
  Active as ActiveView,
  Bot as BotView,
} from './views/Page';

// Account
import {
  Login as LoginView,
  Signup as SignupView,
  ForgotPassword as ForgotPasswordView,
  Profile as ProfileView,
  Bind as BindView,
  ResetPassword as ResetPasswordView,
  TopUp as TopView,
  Withdraw as WithdrawView
} from './views/Account';

// About
import {
  About as AboutView,
  Contact as ContactView,
  Faq as FaqView,
  Privacy as PrivacyView,
} from './views/About';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route
        exact
        path="/"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={HomeViewA}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-membership"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={MembershipView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-about"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={AboutView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-contact"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={ContactView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-facility"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={FacilityView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-faq"
        element={((matchProps) => (
          <WithLayout {...matchProps} component={FaqView} layout={MainLayout} />
        ))()}
      />
      <Route
        exact
        path="/page-privacy"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={PrivacyView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-login"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={LoginView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-signup"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={SignupView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-bind"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={BindView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-reset"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={ResetPasswordView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-withdraw"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={WithdrawView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-top"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={TopView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-forgot-password"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={ForgotPasswordView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-profile/:page"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={ProfileView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-not-found"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={NotFoundView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-payfor/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={PayforView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-payforRegular/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={PayforRegularView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-payforSub/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={PayforSubView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-evaluation/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={EvaluationView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-UpdateEvaluation/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={UpdateEvaluationView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-courses"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={CoursesView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-course"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={CourseView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-activity"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={ActivityView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-activity/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={ActiveView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-bot"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={BotView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-home"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={HomeViewA}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        exact
        path="/page-facility/:id"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={PlacesView}
            layout={MainLayout}
          />
        ))()}
      />
      <Route
        path="*"
        element={((matchProps) => (
          <WithLayout
            {...matchProps}
            component={NotFoundView}
            layout={MainLayout}
          />
        ))()}
      />
    </ReactRoutes>
  );
};

export default Routes;
