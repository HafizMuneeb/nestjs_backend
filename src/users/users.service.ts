import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "muneeb",
            "email": "muneeb@email.com",
            "role": "Engineer"
        },
        {
            "id": 2,
            "name": "Hafiz",
            "email": "hafiz@email.com",
            "role": "Intern"
        },
        {
            "id": 3,
            "name": "muneeb Afzal",
            "email": "afzal@email.com",
            "role": "Admin"
        },
        {
            "id": 4,
            "name": "hafiz muneeb",
            "email": "hafiz@email.com",
            "role": "Intern"
        },
        {
            "id": 5,
            "name": "Afzal",
            "email": "Afzal@email.com",
            "role": "Engineer"
        },
    ]

    findAll(role?: 'Intern' | 'Engineer' | 'Admin') {
        if(role) {
            const rolesArray = this.users.filter(user => user.role ===  role)

            if(rolesArray.length === 0) throw new NotFoundException('user role Not Founnd')
            return rolesArray
        }

        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User Not Found')
        
        return user
    }

    create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
