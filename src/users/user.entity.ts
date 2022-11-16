import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  //==> Relacion uno a uno
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  //==> Relacion muchos a Uno
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
