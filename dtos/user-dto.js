class UserDto {
  username;
  email;
  team;
  isActivated;
  permissions;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.isTeam = !!model.team;
    this.permissions = model.role ? model.role.permissions : {};
  }
}

export default UserDto;
