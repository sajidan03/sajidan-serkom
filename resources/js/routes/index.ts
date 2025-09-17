import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
 * @see routes/web.php:12
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:12
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:12
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:12
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:12
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:12
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:12
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:19
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
export const userView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userView.url(options),
    method: 'get',
})

userView.definition = {
    methods: ["get","head"],
    url: '/admin/user',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
userView.url = (options?: RouteQueryOptions) => {
    return userView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
userView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
userView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
    const userViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
        userViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::userView
 * @see app/Http/Controllers/UserController.php:14
 * @route '/admin/user'
 */
        userViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userView.form = userViewForm
/**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
export const petugasView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugasView.url(options),
    method: 'get',
})

petugasView.definition = {
    methods: ["get","head"],
    url: '/admin/petugas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
petugasView.url = (options?: RouteQueryOptions) => {
    return petugasView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
petugasView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: petugasView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
petugasView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: petugasView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
    const petugasViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: petugasView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
        petugasViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: petugasView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PetugasController::petugasView
 * @see app/Http/Controllers/PetugasController.php:10
 * @route '/admin/petugas'
 */
        petugasViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: petugasView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    petugasView.form = petugasViewForm
/**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
export const paymentView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentView.url(options),
    method: 'get',
})

paymentView.definition = {
    methods: ["get","head"],
    url: '/admin/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
paymentView.url = (options?: RouteQueryOptions) => {
    return paymentView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
paymentView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
paymentView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paymentView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
    const paymentViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: paymentView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
        paymentViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::paymentView
 * @see app/Http/Controllers/PaymentController.php:11
 * @route '/admin/payment'
 */
        paymentViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    paymentView.form = paymentViewForm
/**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
export const wargaView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wargaView.url(options),
    method: 'get',
})

wargaView.definition = {
    methods: ["get","head"],
    url: '/admin/warga',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
wargaView.url = (options?: RouteQueryOptions) => {
    return wargaView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
wargaView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wargaView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
wargaView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: wargaView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
    const wargaViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: wargaView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
        wargaViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: wargaView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WargaController::wargaView
 * @see app/Http/Controllers/WargaController.php:11
 * @route '/admin/warga'
 */
        wargaViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: wargaView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    wargaView.form = wargaViewForm
/**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
export const memberView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: memberView.url(options),
    method: 'get',
})

memberView.definition = {
    methods: ["get","head"],
    url: '/admin/member',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
memberView.url = (options?: RouteQueryOptions) => {
    return memberView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
memberView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: memberView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
memberView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: memberView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
    const memberViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: memberView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
        memberViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: memberView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MemberController::memberView
 * @see app/Http/Controllers/MemberController.php:11
 * @route '/admin/member'
 */
        memberViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: memberView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    memberView.form = memberViewForm
/**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
export const categoryView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categoryView.url(options),
    method: 'get',
})

categoryView.definition = {
    methods: ["get","head"],
    url: '/admin/category',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
categoryView.url = (options?: RouteQueryOptions) => {
    return categoryView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
categoryView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categoryView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
categoryView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categoryView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
    const categoryViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categoryView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
        categoryViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categoryView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CategoryController::categoryView
 * @see app/Http/Controllers/CategoryController.php:11
 * @route '/admin/category'
 */
        categoryViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categoryView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categoryView.form = categoryViewForm
/**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
export const userTambahView = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userTambahView.url(options),
    method: 'get',
})

userTambahView.definition = {
    methods: ["get","head"],
    url: '/admin/user/tambah',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
userTambahView.url = (options?: RouteQueryOptions) => {
    return userTambahView.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
userTambahView.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userTambahView.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
userTambahView.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userTambahView.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
    const userTambahViewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userTambahView.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
        userTambahViewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userTambahView.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::userTambahView
 * @see app/Http/Controllers/UserController.php:29
 * @route '/admin/user/tambah'
 */
        userTambahViewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userTambahView.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userTambahView.form = userTambahViewForm
/**
* @see \App\Http\Controllers\UserController::userTambah
 * @see app/Http/Controllers/UserController.php:32
 * @route '/admin/user/tambah'
 */
export const userTambah = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: userTambah.url(options),
    method: 'post',
})

userTambah.definition = {
    methods: ["post"],
    url: '/admin/user/tambah',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserController::userTambah
 * @see app/Http/Controllers/UserController.php:32
 * @route '/admin/user/tambah'
 */
userTambah.url = (options?: RouteQueryOptions) => {
    return userTambah.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::userTambah
 * @see app/Http/Controllers/UserController.php:32
 * @route '/admin/user/tambah'
 */
userTambah.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: userTambah.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserController::userTambah
 * @see app/Http/Controllers/UserController.php:32
 * @route '/admin/user/tambah'
 */
    const userTambahForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: userTambah.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserController::userTambah
 * @see app/Http/Controllers/UserController.php:32
 * @route '/admin/user/tambah'
 */
        userTambahForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: userTambah.url(options),
            method: 'post',
        })
    
    userTambah.form = userTambahForm
/**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
export const userEdit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userEdit.url(args, options),
    method: 'get',
})

userEdit.definition = {
    methods: ["get","head"],
    url: '/admin/user/edit/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
userEdit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return userEdit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
userEdit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userEdit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
userEdit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userEdit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
    const userEditForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userEdit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
        userEditForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userEdit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserController::userEdit
 * @see app/Http/Controllers/UserController.php:0
 * @route '/admin/user/edit/{id}'
 */
        userEditForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userEdit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userEdit.form = userEditForm
/**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
export const appearance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appearance.url(options),
    method: 'get',
})

appearance.definition = {
    methods: ["get","head"],
    url: '/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
appearance.url = (options?: RouteQueryOptions) => {
    return appearance.definition.url + queryParams(options)
}

/**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
appearance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appearance.url(options),
    method: 'get',
})
/**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
appearance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appearance.url(options),
    method: 'head',
})

    /**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
    const appearanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appearance.url(options),
        method: 'get',
    })

            /**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
        appearanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appearance.url(options),
            method: 'get',
        })
            /**
 * @see routes/settings.php:21
 * @route '/settings/appearance'
 */
        appearanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appearance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appearance.form = appearanceForm
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::register
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:21
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::login
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:19
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:42
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm