import {
  BuildOptions,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  Model,
  Sequelize,
} from 'sequelize';
import { UserAttributes } from './User';
import { SupplyCategory } from './SupplyCategory';

export interface SupplierAttributes {
  ID?: number;
  Name: string;
  ABN: string;
  Logo: string;
  State_ID?: number;
  City_ID?: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  DeletedAt?: Date;
  User?: UserAttributes;
  SupplyCategories?: SupplyCategory[];
}
export interface SupplierModel
  extends Model<SupplierAttributes>,
    SupplierAttributes {
  addSupplyCategory: HasManyAddAssociationMixin<SupplyCategory, number>;
  addSupplyCategories: HasManyAddAssociationsMixin<SupplyCategory, number>;
}
export class Supplier extends Model<SupplierModel, SupplierAttributes> {}

export type SupplierStatic = typeof Model & {
  new (values?: any, options?: BuildOptions): SupplierModel;
};

export function SupplierFactory(sequelize: Sequelize): SupplierStatic {
  return <SupplierStatic>sequelize.define(
    'Supplier',
    {
      ID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ABN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Logo: {
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
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      DeletedAt: {
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
