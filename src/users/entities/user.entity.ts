import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ unique: false, nullable: true })
  frist_name: string;

  @Column({ unique: false, nullable: true })
  last_name: string;

  @Column({ unique: true, nullable: false, type: 'bigint' })
  mobile: number;

  @Column({ unique: false, nullable: false })
  date_of_birth: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
