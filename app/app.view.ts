namespace $.$$ {
    export class $milis_snake_app extends $.$milis_snake_app {

		@$mol_mem
		person(): $milis_snake_person_crus {
			return this.$.$hyoo_crus_glob.home($milis_snake_person_crus)
		}

        size() {
            return this.max_x() * this.max_y()
        }

        @$mol_mem
        food(next?: { x: number; y: number }) {
            return next ?? this.random_point()
        }

        logs(): string {
            return JSON.stringify({ food: this.food(), snake_head: this.snake_head(), snake: this.snake() }, null, 2)
        }

        @$mol_mem
        snake(next?: { x: number; y: number }[]) {
            return (
                next ?? [this.random_point()
                ]
            )
        }

        snake_head() {
            return this.snake()[0]
        }

        @$mol_mem
        y_list(next?: any) {
            return this.array_range(this.max_x_y().y).map(x => this.X(x))
        }

        x_list(id_y: string) {
            return this.array_range(this.max_x_y().x).map(x => this.Cell(`${id_y}_${x}`))
        }

        max_x_y() {
            return { x: this.max_x(), y: this.max_y() }
        }

        array_range(length: number) {
            return Array.from({ length }, (_, index) => index)
        }

        parse_y_x(id_y_x: string) {
            const [y, x] = id_y_x.split('_')
            // return { x: () => +x, y: () => +y }
            return { y: +y, x: +x }
        }

        cell_title(id_x_y: string) {
            const parsed = this.parse_y_x(id_x_y)
            // return JSON.stringify(id_x_y) + JSON.stringify(parsed)
            return id_x_y
            // return ''
        }

        is_cell_food(id_x_y: string) {
            const parsed = this.parse_y_x(id_x_y)
            return parsed.x === this.food().x && parsed.y === this.food().y
        }

        is_cell_snake(id: string): boolean {
            const parsed = this.parse_y_x(id)
            return this.snake().some(x_y => x_y.x === parsed.x && x_y.y === parsed.y)
        }

        is_cell_snake_head(id: string) {
            const parsed = this.parse_y_x(id)
            const head = this.snake()[0]
            return head.x === parsed.x && head.y === parsed.y
        }

        left(next?: any) {
            this.move('left')
        }
        right(next?: any) {
            this.move('right')
        }
        top(next?: any) {
            this.move('top')
        }
        down(next?: any) {
            this.move('down')
        }

        new_game() {
            this.snake([this.random_point()])
            this.eat_food()
			this.person().score(0)
			console.log('>>> ' ,this.person(), this.person().score())
        }

        eat_food() {
            let new_food = this.random_point()
			const max_snake_size = this.snake().length >= (this.max_x() * this.max_y() - 1)
            while (this.point_in_array(new_food, this.snake()) && !max_snake_size) {
                new_food = this.random_point()
            }
            this.food(new_food)
        }

        random(min: number, max: number) {
            return Math.floor(Math.random() * (max - min) + min)
        }

        random_point() {
            return { x: this.random(0, this.max_x()), y: this.random(0, this.max_y()) }
        }

        point_in_array(point: { x: number; y: number }, array: { x: number; y: number }[]) {
            return array.some(p => p.x === point.x && p.y === point.y)
        }

        add_snake_tail(new_head: { x: number; y: number }) {
            console.log('add_snake_tael', new_head)
            this.snake([new_head, ...this.snake()])
        }

        move_snake(new_head: { x: number; y: number }) {
            this.snake([new_head, ...this.snake().slice(0, this.snake().length - 1)])
        }

		score_text(): string {
			// return `Очки:`
			return `Очки: ${this.person().score()}. Рекорд: ${this.person().max_score()}`
			// return `Очки: ${this.person().score()}.`
		}

        move(direction: 'left' | 'right' | 'top' | 'down') {
            // Создание новой головы
            const new_head = { ...this.snake_head() }
            console.log('move_snake ' +direction)
            if (direction === 'left') new_head.x--
            else if (direction === 'right') new_head.x++
            else if (direction === 'top') new_head.y--
            else if (direction === 'down') new_head.y++
            // Проверка на выход за границы. Новая игра
            if (new_head.x <= -1 || new_head.x >= this.max_x() || new_head.y <= -1 || new_head.y >= this.max_y()) {
                console.log('The end. new game')
                this.new_game()
            }
            // Съела сама себя. Новая игра
            else if (this.snake().some(xy => xy.x === new_head.x && xy.y === new_head.y)) {
                console.log('Съела сама себя new game')
                this.new_game()
            }
            // Проверка на еду
            else if (new_head.x === this.food().x && new_head.y === this.food().y) {
                this.add_snake_tail(new_head)
				this.eat_food()
				this.person().score_up()
            } else {
                // Можно двигаться
                this.move_snake(new_head)
            }
        }
    }
}
