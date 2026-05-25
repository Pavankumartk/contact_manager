import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const existingContact = await this.contactsRepository.findOne({
      where: { email: createContactDto.email },
    });

    if (existingContact) {
      throw new ConflictException('Contact with this email already exists');
    }

    const contact = this.contactsRepository.create(createContactDto);
    return await this.contactsRepository.save(contact);
  }

  async findAll(search?: string): Promise<Contact[]> {
    if (search) {
      return await this.contactsRepository.find({
        where: [
          { full_name: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { company_name: ILike(`%${search}%`) },
        ],
        order: { created_at: 'DESC' },
      });
    }
    return await this.contactsRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.findOne(id);
    
    if (updateContactDto.email && updateContactDto.email !== contact.email) {
      const existingContact = await this.contactsRepository.findOne({
        where: { email: updateContactDto.email },
      });
      if (existingContact) {
        throw new ConflictException('Contact with this email already exists');
      }
    }

    Object.assign(contact, updateContactDto);
    return await this.contactsRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.findOne(id);
    await this.contactsRepository.remove(contact);
  }
}
