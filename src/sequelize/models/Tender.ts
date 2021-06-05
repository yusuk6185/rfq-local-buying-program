import {
  BuildOptions,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  Model,
  Sequelize,
} from 'sequelize';

import { Proposal } from './Proposal';
import { SupplyCategory } from './SupplyCategory';
import { TenderProduct } from './TenderProduct';

export interface TenderAttributes {
  ID?: number;
  Buyer_ID?: number;
  PublishedAt?: Date;
  ClosingAt?: Date;
  Title: string;
  Description: string;
  HeadingImage: string;
  State_ID?: number;
  City_ID?: number;
  DeletedAt?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  TenderProducts?: TenderProduct[];
  Proposals?: Proposal[];
}
export interface TenderModel extends Model<TenderAttributes>, TenderAttributes {
  addSupplyCategory: HasManyAddAssociationMixin<SupplyCategory, number>;
  addSupplyCategories: HasManyAddAssociationsMixin<SupplyCategory, number>;
}

export class Tender extends Model<TenderModel, TenderAttributes> {}

export type TenderStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): TenderModel;
};

export function TenderFactory(sequelize: Sequelize): TenderStatic {
  return <TenderStatic>sequelize.define(
    'Tender',
    {
      ID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      HeadingImage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Buyer_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      PublishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ClosingAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      State_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      City_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DeletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    },
  );
}
