export class Route {
// fields

id: number | undefined;
name: string | undefined;
state: string | undefined;
length: number | undefined;
enabled: boolean | undefined;
picture: string | undefined;

// constructor
constructor(id?: number, name?: string, state?: string, length?: number, enabled: boolean = true, picture?: string) {
  this.id = id;
  this.name = name;
  this.state = state;
  this.length = length;
  this.enabled = enabled;
  this.picture = picture;
}

}
