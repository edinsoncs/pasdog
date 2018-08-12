import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardPetComponent } from './card-pet/card-pet'

@NgModule({
	declarations: [CardPetComponent],
	imports: [CommonModule],
	exports: [CardPetComponent]
})

export class ComponentsModule {}
