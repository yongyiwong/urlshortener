import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UrlShortener {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  origin: string;

  @Column({ unique: true })
  shorten: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
