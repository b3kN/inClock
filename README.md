# inClock

### Description
Time management and organization built on MEAN stack for personal and business use.

### Summary
The concept of this app would to create a system for users to be created by an admin and allow the users to input time spent on projects for web development or any development system. A typical user will be allowed to login and view their recent time submissions as well as edit or update before submitting to supervisor.

### Details
##### End User
The end user will typically be an employee or developer wanting to track the time they spent on a project or task. Upon logging in the user will be presented with a screen showing the current week and their inputs up until this point. Previous weeks will be accessible for review and record keeping but will not be editable. The user should be able to export their time sheets in order to have local hard copies if needed.

The user will have the opportunity to view and update their profile settings ranging from username edits to password control. The user will typically be accessing the input fields on the main page in order to update and control their submitted times.

##### Admin User
The admin user will be specifically for the manager/supervisor that will be approving time sheets and collecting a record for the necessary information. The admin user will able to see all of the employees/developers that they have ordinance over. The appearance of the main admin screen will display the list of employees and their timesheet. The admin will be able to access each employees current timesheet but will only have read ability assigned unless the employee has submitted their timesheet to the admin. The admin can accept or decline the timesheet once in the timesheet view for an employee. If the admin declines, they will need to provide a simple response and the employee will receive a notification advising to update. If the admin accepts, the timesheet is stored and the employee will be able to start entering for the new week. The admin will be able to export a large spreadsheet that contains all employees information and data. The admin can add employees to their team but must be approved by a super. 

##### Super User
The super user will be an overseer of all things for all teams assigned to the company. The super has the power of seeing each admin's page as well as the admin's employee's sheets. The super has ability to create and remove users at any level. The super cannot be a manager of employees due to the priority of control throughout the application. The super has the power to assign employees to admins as well as create employees or admins. The super has final say in employee account creation and will also be the final collector of all timesheets.

### Pages Implementations
The application will not have many sections but there will be several views for each:

1. Login
2. Super Section
	1. Overview
	2. Account services
	3. Personal settings
	4. Timesheets access
3. Admin Section
	1. Overview
	2. Employee timesheet
		1. Approve or Decline
	3. Account services
	4. Personal settings
4. Employee Section
	1. Overview
	2. Personal settings
	3. Timesheet view

### Database/Models
There will need to be a few databases in order to conjure all the necessary data and activities:
- Users
- Timesheets
- Weeks

```	
Users: {
	'_id': 1423,
	'Username': 'username',
	'Name': 'Johnny Doe',
	'Password': 'kjv8j3rjlvj9292j29ji',
	'Level': 2 (1 = Super, 2 = Admin, 3 = Employee)
}
```

```
Timesheets: {
	'_id': 151232,
	'UserID': 1423,
	'Week': 52,
	'Status': 0,
	'Sheet': [
		{
			'Day': 'Monday',
			'Times': [
				{
					'Project': 'Business',
					'Hours': 8
				}
			]
		},
		{
			'Day': 'Tuesday',
			'Times': [
				{
					'Project': 'Business',
					'Hours': 4
				},
				{
					'Project': 'Corp',
					'Hours': 4
				}
			]
		}
  ]
}
```
```
Weeks: {
	'Number': 1,
	'StartDate': '1/1/2016',
	'EndDate': '1/2/2016'
}
```
