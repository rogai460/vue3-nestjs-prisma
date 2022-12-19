import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ProjectModule } from './project/project.module';
import { ProjectInfModule } from './project-inf/project-inf.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    PostModule,
    ProjectModule,
    ProjectInfModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
