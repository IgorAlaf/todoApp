export class UserDto {
  email
  id
  isActivated
  constructor(model) {
    this.id = model.user_id
    this.email = model.email
    this.isActivated = model.isactivated
  }
}
